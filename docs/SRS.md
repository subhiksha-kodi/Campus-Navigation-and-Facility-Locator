Software Requirements Specification (SRS)

Project Title

Smart Campus Navigation and Facility Locator System with Indoor Navigation, 3D Digital Twin and Visitor Management

1. Introduction

1.1 Purpose

The Smart Campus Navigation and Facility Locator System is a web-based application designed to simplify campus navigation for students, faculty, staff, and visitors. The system provides outdoor navigation using interactive maps and indoor navigation through 3D digital twin models of selected buildings (AS Block and IB Block). It also includes visitor management, facility location, emergency assistance, announcements, and voice-assisted navigation.

The objective is to reduce navigation difficulties within the campus while improving accessibility, visitor experience, and emergency response.

1.2 Scope

The system enables users to:

Navigate outdoor campus roads and buildings.

Search departments, classrooms, laboratories, offices, and facilities.

View indoor 3D models of AS Block and IB Block.

Find shortest walking paths.

Register campus visitors.

Track visitor approvals.

Locate facilities like ATM, cafeteria, medical centre, washrooms, parking, auditorium, etc.

Receive emergency alerts.

Use voice commands for navigation.

1.3 Definitions

1.4 Intended Audience

Students

Faculty

Visitors

Security Staff

College Administration

Developers

Hackathon Judges

2. Overall Description

2.1 Product Perspective

The system consists of two navigation layers.

Outdoor Navigation

Campus roads

Building locations

Parking

Hostel

Auditorium

Sports Ground

Cafeteria

Indoor Navigation

Implemented only for

AS Block

IB Block

The indoor model contains

Classrooms

Labs

Lift

Staircase

Washrooms

Faculty rooms

Seminar halls

2.2 Product Functions

Authentication

Student Login

Faculty Login

Visitor Login

Outdoor Navigation

Interactive campus map

Building search

Facility search

Route generation

Indoor Navigation

Floor selection

Room search

3D building view

Walking directions

Lift guidance

Stair guidance

Visitor Management

Visitor Registration

Visitor Login

Host Selection

Visit Request

Visit Approval

Visit Rejection

Facility Locator

ATM

Cafeteria

Medical Centre

Parking

Security Office

Auditorium

Hostels

Emergency Module

SOS

Emergency Contacts

Nearby Medical Centre

Security Office

Voice Navigation

Example

"Take me to AI Lab"

The system searches the destination and opens navigation automatically.

Announcements

College circulars

Events

Notices

3. User Characteristics

Student

Searches classrooms

Finds laboratories

Uses navigation

Faculty

Receives visitor requests

Navigates campus

Views announcements

Visitor

Registers visit

Searches departments

Navigates campus

Admin

Adds buildings

Adds rooms

Approves visitors

Updates announcements

Manages users

4. Functional Requirements

Module 1 Authentication

FR-1

System shall allow Student Login.

FR-2

System shall allow Faculty Login.

FR-3

System shall allow Visitor Login.

FR-4

System shall authenticate using JWT.

Module 2 Outdoor Navigation

FR-5

Search buildings.

FR-6

Display shortest route.

FR-7

Display estimated walking time.

Module 3 Indoor Navigation

FR-8

Open 3D model.

FR-9

Display room locations.

FR-10

Display floor.

FR-11

Highlight destination.

FR-12

Display nearby washroom.

FR-13

Display lift.

FR-14

Display staircase.

Module 4 Visitor Management

FR-15

Visitor Registration.

FR-16

Visitor Login.

FR-17

Host Selection.

FR-18

Purpose Selection.

FR-19

Visit Approval.

FR-20

Visit Rejection.

Module 5 Facility Locator

FR-21

Search ATM.

FR-22

Search Cafeteria.

FR-23

Search Medical Centre.

FR-24

Search Parking.

FR-25

Search Auditorium.

Module 6 Notifications

FR-26

Emergency Alerts.

FR-27

Announcements.

FR-28

Visitor Status Notifications.

Module 7 Voice Navigation

FR-29

Accept voice input.

FR-30

Convert speech to text.

FR-31

Navigate to destination.

5. Non-Functional Requirements

Performance

Response time less than 2 seconds

100+ concurrent users

Route generation under 3 seconds

Security

JWT Authentication

bcrypt password hashing

Role-based access

HTTPS communication

Reliability

99% availability

Automatic recovery after failures

Reliable database transactions

Scalability

The system is designed to support future expansion without major architectural changes.

Future enhancements include:

Additional academic blocks

Indoor navigation for all buildings

Mobile application

Real-time classroom occupancy

IoT sensor integration

Smart parking

AI chatbot

Maintainability

Modular React components

RESTful APIs

Clean folder structure

Separate frontend/backend

Availability

Available 24×7.

Usability

Simple interface.

Responsive design.

Minimal learning required.

Portability

Works on

Chrome

Edge

Firefox

Mobile browsers

6. System Architecture

7. Database Design

Users

UserID

Name

Email

Password

Role

Buildings

BuildingID

BuildingName

Latitude

Longitude

Floors

FloorID

BuildingID

FloorNo

Rooms

RoomID

FloorID

RoomNo

RoomType

Facilities

FacilityID

FacilityName

Building

Visitors

VisitorID

Name

Host

Purpose

Status

Announcements

AnnouncementID

Title

Description

Date

8. Technology Stack

9. Assumptions

Internet connection is available.

Campus map coordinates are correct.

Indoor models exist only for AS Block and IB Block.

GPS accuracy is sufficient for outdoor navigation.

10. Constraints

Indoor navigation is limited to AS and IB Blocks.

GPS accuracy decreases indoors.

Coohom models require internet access if used via shared links.

Browser compatibility depends on WebGL support.

11. Future Enhancements

Indoor navigation for every campus building.

AR-based navigation.

AI chatbot assistant.

Smart parking availability.

Classroom occupancy tracking.

Attendance integration.

Timetable integration.

Real-time shuttle tracking.

Emergency evacuation guidance.

IoT-enabled smart campus features.