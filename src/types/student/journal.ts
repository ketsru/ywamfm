

export interface Journal {
    id: string

    etudiant_id: string

    nom_orateur: string
    origine_orateur: string
    fruit_orateur: string

    theme_semaine: string
    grandes_revelations: string

    impact: string
    demarche: string
    changement: string
    croissance: string

    observation_semaine: string
    reaction_semaine: string
    experience: string

    vecu_semaine: string

    lu: boolean

    created_at: string
    updated_at: string
}
