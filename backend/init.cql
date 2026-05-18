CREATE KEYSPACE IF NOT EXISTS "lectureLog" 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE "lectureLog";

-- [TABEL ENTITAS & METADATA]
CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY,
    name text,
    email text,
    role text,
    created_at timestamp
);

CREATE TABLE IF NOT EXISTS courses_by_user (
    user_id uuid,
    course_id uuid,
    course_name text,
    role text,
    enrolled_at timestamp,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS sessions (
    course_id uuid,
    semester text,
    session_id timeuuid,
    lecturer_id uuid,
    room text,
    started_at timestamp,
    topic text,
    PRIMARY KEY ((course_id, semester), session_id)
) WITH CLUSTERING ORDER BY (session_id DESC);

-- [TABEL OPERASIONAL: TIMELINE & MATERI]
CREATE TABLE IF NOT EXISTS events_by_course (
    course_id uuid,
    bucket int,
    event_id timeuuid,
    event_type text,
    title text,
    description text,
    created_by uuid,
    attachment_url text,
    payload map<text, text>,
    PRIMARY KEY ((course_id, bucket), event_id)
) WITH CLUSTERING ORDER BY (event_id DESC);

CREATE TABLE IF NOT EXISTS materials_by_course (
    course_id uuid,
    semester text,
    material_id timeuuid,
    title text,
    type text,
    file_url text,
    uploaded_by uuid,
    PRIMARY KEY ((course_id, semester), material_id)
) WITH CLUSTERING ORDER BY (material_id DESC);

-- [TABEL TRANSAKSIONAL DUAL-WRITE 1: ABSENSI]
CREATE TABLE IF NOT EXISTS attendance_by_session (
    session_id timeuuid,
    user_id uuid,
    status text,
    checked_in_at timestamp,
    note text,
    PRIMARY KEY (session_id, user_id)
);

CREATE TABLE IF NOT EXISTS attendance_by_user (
    user_id uuid,
    semester text,
    session_id timeuuid,
    course_id uuid,
    status text,
    checked_in_at timestamp,
    PRIMARY KEY ((user_id, semester), session_id)
) WITH CLUSTERING ORDER BY (session_id DESC);

-- [TABEL TRANSAKSIONAL DUAL-WRITE 2: TUGAS & PENILAIAN]
CREATE TABLE IF NOT EXISTS assignments_by_course (
  course_id     uuid,
  semester      text,
  assignment_id timeuuid,
  title         text,
  description   text,
  deadline      timestamp,
  max_score     int,
  created_by    uuid,
  PRIMARY KEY ((course_id, semester), assignment_id)
) WITH CLUSTERING ORDER BY (assignment_id DESC);

CREATE TABLE IF NOT EXISTS submissions_by_assignment (
  assignment_id  uuid,
  student_id     uuid,
  submitted_at   timestamp,
  file_url       text,
  file_name      text,
  score          float,
  feedback       text,
  status         text,
  graded_by      uuid,
  graded_at      timestamp,
  PRIMARY KEY (assignment_id, student_id)
);

CREATE TABLE IF NOT EXISTS submissions_by_student (
  student_id    uuid,
  semester      text,
  assignment_id timeuuid,
  course_id     uuid,
  title         text,
  submitted_at  timestamp,
  file_url      text,
  score         float,
  status        text,
  PRIMARY KEY ((student_id, semester), assignment_id)
) WITH CLUSTERING ORDER BY (assignment_id DESC);
