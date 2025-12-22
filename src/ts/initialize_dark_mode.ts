// note: wrap within function scope to avoid variables becoming global

(function () {
    // first check localstorage
    const savedTheme = localStorage.getItem("theme");

    // then check os preference
    const darkOSPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // apply theme based on saved preference or system preference
    if (
        savedTheme === "dark" ||
        (savedTheme === "system" && darkOSPreference) ||
        (!savedTheme && darkOSPreference)
    ) {
        document.documentElement.classList.add("dark");
    }
})();
