function enableDarkModeButton() {
    const darkModeButton = document.getElementById(
        "darkModeButton"
    ) as HTMLButtonElement;

    if (!darkModeButton) {
        console.error("dark mode button not found!");
        return;
    }

    function applyTheme(theme: string) {
        const darkOSPreference = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // reset theme
        document.documentElement.classList.remove("dark");

        // apply theme
        if (theme === "dark" || (theme === "system" && darkOSPreference)) {
            document.documentElement.classList.add("dark");
        }
    }

    function updateDarkModeButton(darkModeButton: HTMLButtonElement) {
        const savedTheme = localStorage.getItem("theme") || "system";
        const icon = darkModeButton.querySelector(".material-symbols-outlined");

        if (!icon) {
            console.log("dark mode button icon not found!");
            return;
        }

        switch (savedTheme) {
            case "light":
                icon.textContent = "light_mode";
                darkModeButton.setAttribute(
                    "data-tooltip-content",
                    "Light mode"
                );
                break;
            case "dark":
                icon.textContent = "dark_mode";
                darkModeButton.setAttribute(
                    "data-tooltip-content",
                    "Dark mode"
                );
                break;
            case "system":
            default:
                icon.textContent = "routine";
                darkModeButton.setAttribute("data-tooltip-content", "System");
                break;
        }

        document.dispatchEvent(new CustomEvent("updatetooltip"));
    }

    // initialize dark mode button
    updateDarkModeButton(darkModeButton);

    darkModeButton.addEventListener("click", () => {
        const currentTheme = localStorage.getItem("theme") || "system";
        let nextTheme: string;

        // set next theme
        switch (currentTheme) {
            case "light":
                nextTheme = "dark";
                break;
            case "dark":
                nextTheme = "system";
                break;
            case "system":
            default:
                nextTheme = "light";
                break;
        }

        // save and apply theme
        localStorage.setItem("theme", nextTheme);

        applyTheme(nextTheme);
        updateDarkModeButton(darkModeButton);
    });

    // listen for system color preference changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const currentTheme = localStorage.getItem("theme") || "system";

            if (currentTheme === "system") {
                applyTheme("system");
            }
        });
}

export { enableDarkModeButton };
