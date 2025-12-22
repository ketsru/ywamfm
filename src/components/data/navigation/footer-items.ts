
type Menu = {
    title: string;
    menuItems: MenuItems[];
}

type MenuItems = {
    label: string;
    href: string;
}

export const usefullLinkItems: Menu[] = [
    {
        title: "Navigation",
        menuItems: [
            { label: "Accueil", href: "/"}, 
            { label: "A propos", href: "/about"}, 
            { label: "blog", href: "/blog"},
        ]
    },
    {
        title: "Prendre actions",
        menuItems: [
            { label: "Nous contacter", href: "/contact-us"}, 
            { label: "Devenir Partenaire", href: "/partner/join"},
        ]
    },
    {
        title: "Lien utiles",
        menuItems: [
            { label: "Conditions d'utilisateur", href: "/usefull-links/usage"}, 
            { label: "Politique de confidentialité", href: "/usefull-links/confidence"},
        ]
    },
]