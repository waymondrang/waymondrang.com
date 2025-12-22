function enableInfoModal(): void {
    const modal = document.getElementById("modal") as HTMLElement;
    const openButton = document.getElementById(
        "infoButton"
    ) as HTMLButtonElement;
    const closeButton = document.getElementById(
        "modalCloseButton"
    ) as HTMLButtonElement;
    const backdrop = document.querySelector("#modal .backdrop") as HTMLElement;

    if (!modal || !openButton || !closeButton || !backdrop) {
        console.error("modal elements not found");
        return;
    }

    function openModal(): void {
        modal.classList.add("visible");

        // freeze scrolling
        document.body.style.overflow = "hidden";
    }

    function closeModal(): void {
        modal.classList.remove("visible");

        // restore scrolling
        document.body.style.overflow = "";
    }

    openButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        openModal();
    });

    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        closeModal();
    });

    backdrop.addEventListener("click", () => {
        closeModal();
    });

    // add esc key listener
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("visible")) {
            closeModal();
        }
    });

    // Prevent modal content clicks from closing the modal
    modal.querySelector(".modalContent")?.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

export { enableInfoModal };
