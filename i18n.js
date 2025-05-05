document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        pt: {
            "Nossos Produtos": "Nossos Produtos",
            "Conheça nossa linha exclusiva para um bronzeado perfeito": "Conheça nossa linha exclusiva para um bronzeado perfeito",
            "todos": "Todos",
            "ativadores": "Ativadores",
            "potencializadores": "Potencializadores",
            "hidratantes": "Hidratantes",
            "esfoliantes": "Esfoliantes",
            "oleo-corporal": "Óleo corporal",
            "agua-oxigenada": "Água Oxigenada",
            "po-descolorante": "Pó descolorante",
            "corantes": "Corantes",
            "cuidados-pele": "Cuidados com a pele",
            "fitas": "Fitas",
        },
        en: {
            "Nossos Produtos": "Our Products",
            "Conheça nossa linha exclusiva para um bronzeado perfeito": "Discover our exclusive line for a perfect tan",
            "todos": "All",
            "ativadores": "Activators",
            "potencializadores": "Boosters",
            "hidratantes": "Moisturizers",
            "esfoliantes": "Exfoliants",
            "oleo-corporal": "Body Oil",
            "agua-oxigenada": "Hydrogen Peroxide",
            "po-descolorante": "Bleaching Powder",
            "corantes": "Dyes",
            "cuidados-pele": "Skin Care",
            "fitas": "Tapes",
        },
        es: {
            "Nossos Produtos": "Nuestros Productos",
            "Conheça nossa linha exclusiva para um bronzeado perfeito": "Descubre nuestra línea exclusiva para un bronceado perfecto",
            "todos": "Todos",
            "ativadores": "Activadores",
            "potencializadores": "Potenciadores",
            "hidratantes": "Hidratantes",
            "esfoliantes": "Exfoliantes",
            "oleo-corporal": "Aceite Corporal",
            "agua-oxigenada": "Agua Oxigenada",
            "po-descolorante": "Polvo Decolorante",
            "corantes": "Colorantes",
            "cuidados-pele": "Cuidado de la Piel",
            "fitas": "Cintas",
        },
    };

    const currentLang = localStorage.getItem("lang") || "pt";

    function translatePage(language) {
        const elements = document.querySelectorAll("[data-i18n-key]");
        elements.forEach((el) => {
            const key = el.getAttribute("data-i18n-key");
            if (translations[language] && translations[language][key]) {
                el.textContent = translations[language][key];
            }
        });
    }

    // Event listener for language buttons
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedLang = btn.getAttribute("data-lang");
            localStorage.setItem("lang", selectedLang);
            translatePage(selectedLang);
        });
    });

    // Initial translation
    translatePage(currentLang);
}); 