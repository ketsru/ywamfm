export enum PermissionKey {
    // =========================================
    // Authentification & Profil
    // =========================================
    USER_REGISTER = "USER_REGISTER",
    USER_LOGIN = "USER_LOGIN",
    USER_VIEW_SELF = "USER_VIEW_SELF",
    USER_UPDATE_SELF = "USER_UPDATE_SELF",
    USER_ENABLE_2FA = "USER_ENABLE_2FA",
    USER_DISABLE_2FA = "USER_DISABLE_2FA",
    USER_MANAGE_SESSIONS = "USER_MANAGE_SESSIONS",

    // =========================================
    // Utilisateurs
    // =========================================
    USER_VIEW = "USER_VIEW",
    USER_CREATE = "USER_CREATE",
    USER_UPDATE = "USER_UPDATE",
    USER_DELETE = "USER_DELETE",
    USER_ACTIVATE = "USER_ACTIVATE",
    USER_DEACTIVATE = "USER_DEACTIVATE",
    USER_FORCE_PASSWORD_RESET = "USER_FORCE_PASSWORD_RESET",

    // =========================================
    // Rôles
    // =========================================
    ROLE_VIEW = "ROLE_VIEW",
    ROLE_CREATE = "ROLE_CREATE",
    ROLE_UPDATE = "ROLE_UPDATE",
    ROLE_DELETE = "ROLE_DELETE",
    ROLE_ASSIGN = "ROLE_ASSIGN",

    // =========================================
    // Permissions
    // =========================================
    PERMISSION_VIEW = "PERMISSION_VIEW",
    PERMISSION_ASSIGN = "PERMISSION_ASSIGN",

    // =========================================
    // Journaux & Sécurité
    // =========================================
    AUDIT_LOG_VIEW = "AUDIT_LOG_VIEW",
    AUDIT_LOG_EXPORT = "AUDIT_LOG_EXPORT",
    SECURITY_LOG_VIEW = "SECURITY_LOG_VIEW",

    // =========================================
    // Référentiels
    // =========================================
    REFERENCE_DATA_VIEW = "REFERENCE_DATA_VIEW",
    REFERENCE_DATA_CREATE = "REFERENCE_DATA_CREATE",
    REFERENCE_DATA_UPDATE = "REFERENCE_DATA_UPDATE",
    REFERENCE_DATA_DELETE = "REFERENCE_DATA_DELETE",

    // =========================================
    // Départements
    // =========================================
    DEPARTMENT_VIEW = "DEPARTMENT_VIEW",
    DEPARTMENT_CREATE = "DEPARTMENT_CREATE",
    DEPARTMENT_UPDATE = "DEPARTMENT_UPDATE",
    DEPARTMENT_DELETE = "DEPARTMENT_DELETE",

    // =========================================
    // Promotions
    // =========================================
    PROMOTION_VIEW = "PROMOTION_VIEW",
    PROMOTION_CREATE = "PROMOTION_CREATE",
    PROMOTION_UPDATE = "PROMOTION_UPDATE",
    PROMOTION_DELETE = "PROMOTION_DELETE",

    // =========================================
    // Étudiants
    // =========================================
    STUDENT_VIEW = "STUDENT_VIEW",
    STUDENT_CREATE = "STUDENT_CREATE",
    STUDENT_UPDATE = "STUDENT_UPDATE",
    STUDENT_DELETE = "STUDENT_DELETE",

    // =========================================
    // Staff / Formateurs
    // =========================================
    STAFF_VIEW = "STAFF_VIEW",
    STAFF_CREATE = "STAFF_CREATE",
    STAFF_UPDATE = "STAFF_UPDATE",
    STAFF_DELETE = "STAFF_DELETE",

    // =========================================
    // Cours
    // =========================================
    COURSE_VIEW = "COURSE_VIEW",
    COURSE_CREATE = "COURSE_CREATE",
    COURSE_UPDATE = "COURSE_UPDATE",
    COURSE_DELETE = "COURSE_DELETE",

    // =========================================
    // Inscriptions
    // =========================================
    ENROLLMENT_VIEW = "ENROLLMENT_VIEW",
    ENROLLMENT_CREATE = "ENROLLMENT_CREATE",
    ENROLLMENT_UPDATE = "ENROLLMENT_UPDATE",
    ENROLLMENT_DELETE = "ENROLLMENT_DELETE",

    // =========================================
    // Emplois du temps
    // =========================================
    SCHEDULE_VIEW = "SCHEDULE_VIEW",
    SCHEDULE_CREATE = "SCHEDULE_CREATE",
    SCHEDULE_UPDATE = "SCHEDULE_UPDATE",
    SCHEDULE_DELETE = "SCHEDULE_DELETE",

    // =========================================
    // Devoirs
    // =========================================
    ASSIGNMENT_VIEW = "ASSIGNMENT_VIEW",
    ASSIGNMENT_CREATE = "ASSIGNMENT_CREATE",
    ASSIGNMENT_UPDATE = "ASSIGNMENT_UPDATE",
    ASSIGNMENT_DELETE = "ASSIGNMENT_DELETE",
    ASSIGNMENT_SUBMIT = "ASSIGNMENT_SUBMIT",
    ASSIGNMENT_GRADE = "ASSIGNMENT_GRADE",

    // =========================================
    // Notes
    // =========================================
    GRADE_VIEW = "GRADE_VIEW",
    GRADE_CREATE = "GRADE_CREATE",
    GRADE_UPDATE = "GRADE_UPDATE",
    GRADE_DELETE = "GRADE_DELETE",

    // =========================================
    // Documents
    // =========================================
    DOCUMENT_VIEW = "DOCUMENT_VIEW",
    DOCUMENT_CREATE = "DOCUMENT_CREATE",
    DOCUMENT_UPDATE = "DOCUMENT_UPDATE",
    DOCUMENT_DELETE = "DOCUMENT_DELETE",

    // =========================================
    // Annonces
    // =========================================
    ANNOUNCEMENT_VIEW = "ANNOUNCEMENT_VIEW",
    ANNOUNCEMENT_CREATE = "ANNOUNCEMENT_CREATE",
    ANNOUNCEMENT_UPDATE = "ANNOUNCEMENT_UPDATE",
    ANNOUNCEMENT_DELETE = "ANNOUNCEMENT_DELETE",

    // =========================================
    // Notifications
    // =========================================
    NOTIFICATION_VIEW = "NOTIFICATION_VIEW",
    NOTIFICATION_SEND = "NOTIFICATION_SEND",

    // =========================================
    // Rapports & Statistiques
    // =========================================
    REPORT_VIEW = "REPORT_VIEW",
    REPORT_EXPORT = "REPORT_EXPORT",
}