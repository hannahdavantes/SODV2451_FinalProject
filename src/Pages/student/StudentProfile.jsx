import { Mail, User } from "lucide-react";

export default function StudentProfile() {
  const email = localStorage.getItem("email") || "Not available";
  const role = "Student";
  const userId = localStorage.getItem("userId") || "Not available";

  return (
    <>
      <div className="student-page-heading">
        <h1>My Profile</h1>
        <p>View your login details</p>
      </div>

      <div className="student-profile-wrap">
        <section className="student-card">
          <div className="student-card-content">
            <div className="student-profile-card">
              <div className="student-profile-photo-area">
                <div className="student-profile-photo">
                  <User size={52} />
                </div>
                <p className="student-profile-note">Profile photo upload is unavailable in this school project.</p>
              </div>

              <div className="student-profile-info">
                <div>
                  <h2>{email}</h2>
                  <p>{role}</p>
                </div>

                <div className="student-detail-item">
                  <span className="student-detail-icon blue">
                    <User size={21} />
                  </span>
                  <div>
                    <p>Account ID</p>
                    <strong>{userId}</strong>
                  </div>
                </div>

                <div className="student-detail-item">
                  <span className="student-detail-icon green">
                    <Mail size={21} />
                  </span>
                  <div>
                    <p>Email</p>
                    <strong>{email}</strong>
                  </div>
                </div>

                <p className="student-profile-note">
                  Editing and photo upload are not connected to the backend and are shown here as unavailable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
