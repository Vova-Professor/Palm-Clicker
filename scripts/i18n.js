function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;

            if (!dict[key]) return;

            if (el.tagName === "INPUT") {
                el.value = dict[key];
            } else {
                el.textContent = dict[key];
            }
    })
}