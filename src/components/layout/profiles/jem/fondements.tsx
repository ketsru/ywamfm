"use client"

import { useState } from "react"
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface CoreValue {
    number: number
    title: string
    content: string
}

const CORE_VALUES: CoreValue[] = [
    {
        number: 1,
        title: "Connaître Dieu",
        content:
            "Jeunesse en Mission est engagée à connaître Dieu, Sa nature, Son caractère et Ses voies. Nous cherchons à refléter qui Il est dans chaque aspect de nos vies et de notre ministère. De notre connaissance de Dieu et du plaisir que nous avons dans Sa communion découle automatiquement le désir de Le partager avec les autres.",
    },
    {
        number: 2,
        title: "Faire connaître Dieu",
        content:
            "Jeunesse en Mission est appelée à faire connaître Dieu à travers le monde entier et dans chaque domaine de la société par l'évangélisation, la formation et les ministères d'entraide. Nous croyons que le salut des âmes devrait résulter en la transformation des sociétés, obéissant ainsi au commandement de Jésus de faire de toutes les nations des disciples.",
    },
    {
        number: 3,
        title: "Entendre la voix de Dieu",
        content:
            "Jeunesse en Mission est engagée à créer avec Dieu en écoutant Sa voix, priant Ses prières et obéissant à Ses commandements à petite ou à grande échelle. Nous nous attendons à entendre Sa voix individuellement, dans le contexte d'une équipe et dans des rassemblements, ceci faisant partie intégrante de notre processus de décision.",
    },
    {
        number: 4,
        title: "Pratiquer la louange et la prière d'intercession",
        content:
            "Jeunesse en Mission est engagée à louer Jésus et à s'impliquer dans la prière d'intercession comme faisant partie intégrante de notre vie quotidienne. Nous reconnaissons aussi l'intention de Satan de détruire l'œuvre de Dieu et nous faisons appel à la puissance de Dieu et au Saint-Esprit pour vaincre ses stratégies dans les vies individuelles et dans les affaires des nations.",
    },
    {
        number: 5,
        title: "Être visionnaire",
        content:
            "Jeunesse en Mission est appelée à être visionnaire, à recevoir, nourrir et libérer continuellement des visions fraîches venues de Dieu. Nous soutenons l'aspect pionnier de nouvelles méthodes ou ministères, étant toujours prêts à être radicaux et adaptés à chaque génération, groupe de personnes et chaque sphère de la société. Nous croyons que l'appel apostolique de Jeunesse en Mission exige l'intégration de la couverture spirituelle des anciens, la liberté du Saint-Esprit et les relations, centrées sur la Parole de Dieu.",
    },
    {
        number: 6,
        title: "Soutenir les jeunes",
        content:
            "Jeunesse en Mission est appelée à soutenir la jeunesse. Nous croyons que Dieu a équipé et a appelé des jeunes pour initier des visions et ministères. Nous sommes engagés à les valoriser, leur faire confiance, les former, les soutenir, leur laisser de la place et les libérer pour qu'ils deviennent l'Eglise de demain, dès aujourd'hui. Nous ne sommes pas seulement à les suivre, mais à marcher avec eux là où ils vont, dans la volonté de Dieu.",
    },
    {
        number: 7,
        title: "Avoir une structure souple et décentralisée",
        content:
            "Jeunesse en Mission a une structure souple et diversifiée, cependant intégrée. Nous sommes une grande famille de ministères reliée par des buts, visions, valeurs et relations communes. Nous croyons que les structures devraient servir les gens et les buts de Dieu. Chaque ministère, à tout niveau, a le privilège et la responsabilité d'être redevable à un cercle d'anciens, avec une redevabilité générale au niveau international et à l'équipe globale de leadership de Jeunesse en Mission.",
    },
    {
        number: 8,
        title: "Être international et interdénominationnel",
        content:
            "Jeunesse en Mission est internationale et inter-dénominationelle dans son entité globale ainsi que dans sa constitution locale. Nous croyons que la diversité ethnique, linguistique et dénominationelle, allant de pair avec les aspects rachetés de la culture, sont des facteurs qui contribuent au bien-être et à la croissance de la mission.",
    },
    {
        number: 9,
        title: "Avoir une perspective biblique du monde",
        content:
            "Jeunesse en Mission est appelée à une perspective biblique du monde. Nous croyons que la Bible fait une nette séparation entre le bien et le mal, ce qui est vrai et ce qui est faux. Les dimensions pratiques de la vie ne sont pas moins spirituelles que les expressions du ministère. Tout ce qui est fait en obéissance à Dieu est spirituel. Nous cherchons à honorer Dieu avec tout ce que nous faisons, équipant et mobilisant des hommes et des femmes de Dieu pour prendre des rôles de service et d'influence dans chaque aspect de la société.",
    },
    {
        number: 10,
        title: "Fonctionner en équipe",
        content:
            "Jeunesse en Mission est appelée à fonctionner en équipe dans tous les aspects du ministère et des responsabilités. Nous croyons qu'une combinaison de dons complémentaires, appels, perspectives, ministères et générations travaillant ensemble dans l'unité, à tous les niveaux de notre mission, produit la sagesse et la sécurité. Chercher la volonté de Dieu et prendre des décisions en équipe permet la redevabilité et contribue à de meilleures relations, motivations, responsabilités et appartenance à la vision.",
    },
    {
        number: 11,
        title: "Pratiquer le modèle de leader-serviteur",
        content:
            "Jeunesse en Mission est appelée au leadership serviteur comme un style de vie plutôt que comme une hiérarchie de leadership. Un leader-serviteur est quelqu'un qui honore les dons et les appels de ceux qui sont sous sa garde et préserve leurs droits et privilèges. De même que Jésus a servi ses disciples, nous soulignons l'importance, pour ceux qui ont des responsabilités de leadership, d'être au service de ceux qu'ils conduisent.",
    },
    {
        number: 12,
        title: "Faire d'abord, ensuite enseigner",
        content:
            "Jeunesse en Mission est engagée à faire d'abord puis à enseigner. Nous croyons que l'expérience concrète donne l'autorité à nos paroles. Le caractère divin et un appel de Dieu sont plus importants que les dons d'une personne, les capacités et l'expertise.",
    },
    {
        number: 13,
        title: "Être relationnel",
        content:
            "Jeunesse en Mission est engagée à être orientée sur les relations dans notre manière de vivre et de travailler ensemble. Nous voulons être unis par une vie de sainteté, de soutien mutuel, de transparence, d'humilité et de communication ouverte, plutôt que par une dépendance à l'égard des structures ou des règles.",
    },
    {
        number: 14,
        title: "Valoriser l'individu",
        content:
            "Jeunesse en Mission est appelée à valoriser chaque individu. Nous croyons en l'égalité des chances et la justice pour tous. Nous croyons que les gens, qui sont faits à l'image de Dieu, de toutes les nationalités, âges et fonctions, ont des appels et contributions distincts. Nous sommes engagés à les honorer tous.",
    },
    {
        number: 15,
        title: "Rendre témoignage",
        content:
            "Nous sommes appelés à partager l'évangile de Jésus-Christ avec ceux qui ne le connaissent pas.",
    },
    {
        number: 16,
        title: "Prière",
        content:
            "Nous sommes appelés à nous engager dans la prière d'intercession pour le peuple et les problèmes que Dieu nous met à cœur, notamment en nous opposant au mal sous toutes ses formes.",
    },
    {
        number: 17,
        title: "Communion fraternelle",
        content:
            "Nous sommes appelés à nous engager envers l'Eglise, à la fois dans son expression locale pour se nourrir, et dans son expression mobile pour se multiplier.",
    },
]

export default function YwamFondements() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const allOpen = openItems.length === CORE_VALUES.length

    const toggleAll = () => {
        setOpenItems(allOpen ? [] : CORE_VALUES.map((v) => `value-${v.number}`))
    }

    return (
        <div className="space-y-6">
            {/* Introduction */}
            <div className="rounded-lg bg-muted/50 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Les valeurs fondamentales de Jeunesse en Mission sont l&apos;expression de nos
                    croyances de base, combinées avec des directives spécifiques données par Dieu
                    depuis les débuts de Jeunesse en Mission en 1960. Elles ont été enregistrées ici
                    afin de transmettre aux générations futures ce sur quoi Dieu a insisté dans nos
                    vies. Ces croyances et valeurs qui nous unissent sont les principes guides pour la
                    croissance passée et future de notre Mission. Certaines de ces valeurs sont
                    communes à tous les chrétiens du monde, certaines sont particulières à Jeunesse en
                    Mission. La combinaison de ces croyances et valeurs forme les caractéristiques de
                    la famille unique de Jeunesse en Mission, notre « ADN ». Ce sont des valeurs que
                    nous tenons en haute estime, qui déterminent qui nous sommes, comment nous vivons
                    et comment nous prenons des décisions.
                </p>
            </div>

            {/* Contrôle déplier/replier tout */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    {CORE_VALUES.length} valeurs fondamentales
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAll}
                    className="gap-1.5 text-xs text-muted-foreground"
                >
                    {allOpen ? (
                        <>
                            <ChevronsDownUp className="h-3.5 w-3.5" />
                            Tout replier
                        </>
                    ) : (
                        <>
                            <ChevronsUpDown className="h-3.5 w-3.5" />
                            Tout déplier
                        </>
                    )}
                </Button>
            </div>

            {/* Accordéon des valeurs */}
            <Accordion
                type="multiple"
                value={openItems}
                onValueChange={setOpenItems}
                className="w-full"
            >
                {CORE_VALUES.map((value) => (
                    <AccordionItem key={value.number} value={`value-${value.number}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                            <span className="flex items-baseline gap-3">
                                <span className="text-xs font-mono text-muted-foreground shrink-0">
                                    {String(value.number).padStart(2, "0")}
                                </span>
                                <span className="font-semibold">{value.title}</span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-sm leading-relaxed text-muted-foreground pl-9">
                                {value.content}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}