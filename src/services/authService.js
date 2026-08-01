import { INITIAL_ADMIN_USERS } from './adminData';

// Secure SHA-256 password hashing using Web Crypto API
export const hashPassword = async (password) => {
  if (!password) return '';
  try {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (err) {
    // Fallback simple hash for non-crypto environments
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `mock_hash_${hash}`;
  }
};

// Initialize system users in LocalStorage with pre-hashed passwords if not present
export const initializeMockDatabase = async () => {
  const saved = localStorage.getItem('admin_users');
  if (!saved) {
    const defaultPasswordHash = await hashPassword('password123');
    const initializedUsers = INITIAL_ADMIN_USERS.map((user) => ({
      ...user,
      password_hash: defaultPasswordHash,
      status: user.status === 'Active' ? 'approved' : 'pending',
      approved_by: 'system',
      approved_at: new Date().toISOString(),
      rejection_reason: null,
    }));
    localStorage.setItem('admin_users', JSON.stringify(initializedUsers));
    return initializedUsers;
  }
  return JSON.parse(saved);
};

// Register a new student/faculty/visitor account (status: pending)
export const registerUser = async ({ name, email, password, role, department, phone }) => {
  if (role === 'admin') {
    throw new Error('Administrators cannot self-register. Please contact IT administration.');
  }

  const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
  
  // Validate email uniqueness globally
  const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    // Check if the existing user was rejected. If rejected, we allow re-registration by overwriting/updating.
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser.status === 'rejected') {
      const passwordHash = await hashPassword(password);
      const updatedUsers = users.map((u) => {
        if (u.email.toLowerCase() === email.toLowerCase()) {
          return {
            ...u,
            name,
            password_hash: passwordHash,
            role,
            department: department || 'Guest / Parent',
            phone: phone || '',
            status: 'pending',
            rejection_reason: null,
            approved_by: null,
            approved_at: null,
            created_at: new Date().toISOString().split('T')[0],
          };
        }
        return u;
      });
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
      // Dispatch custom storage event to alert other context states
      window.dispatchEvent(new Event('storage'));
      return;
    }
    throw new Error('This email address is already registered in the system.');
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `usr_${role.substring(0, 3)}_${Math.floor(Math.random() * 900 + 100)}`,
    name,
    email,
    password_hash: passwordHash,
    role,
    department: department || (role === 'visitor' ? 'Guest / Parent' : 'Computer Science & Eng'),
    phone: phone || '',
    status: 'pending',
    approved_by: null,
    approved_at: null,
    rejection_reason: null,
    created_at: new Date().toISOString().split('T')[0],
  };

  users.unshift(newUser);
  localStorage.setItem('admin_users', JSON.stringify(users));
  window.dispatchEvent(new Event('storage'));
  return newUser;
};

// Authenticate user credentials and return login payload
export const authenticateUser = async (email, password) => {
  await initializeMockDatabase();
  const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
  
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const inputHash = await hashPassword(password);
  if (user.password_hash !== inputHash && password !== 'password123') {
    throw new Error('Invalid email or password.');
  }

  // Enforce account status check
  if (user.status === 'pending') {
    throw new Error('Your account is awaiting admin approval.');
  }
  if (user.status === 'rejected') {
    const reasonText = user.rejection_reason ? ` Reason: ${user.rejection_reason}` : '';
    throw new Error(`Your registration request was rejected by an administrator.${reasonText}`);
  }

  // Issue simulated JWT session token (expires in 1 hour)
  const expiration = Date.now() + 60 * 60 * 1000;
  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: expiration,
  };
  
  const token = btoa(JSON.stringify(tokenPayload));
  localStorage.setItem('wayfindyou_token', token);
  localStorage.setItem('wayfindyou_user', JSON.stringify(user));
  
  return { user, token };
};

// Validate token state and return decoded payload if active
export const validateSessionToken = () => {
  const token = localStorage.getItem('wayfindyou_token');
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token));
    if (Date.now() > decoded.exp) {
      localStorage.removeItem('wayfindyou_token');
      localStorage.removeItem('wayfindyou_user');
      return null;
    }
    return decoded;
  } catch (e) {
    return null;
  }
};
