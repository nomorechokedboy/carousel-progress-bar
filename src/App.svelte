<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    let currentSlide = 0;
    let interval: NodeJS.Timeout;
    const delay = 5000; // time in milliseconds between slide changes
    const slides = [
        {
            src: "https://rustacean.net/assets/cuddlyferris.png",
            alt: "Slide 1",
        },
        {
            src: "https://golang.company/favicon.ico",
            alt: "Slide 2",
        },
        {
            src: "https://rustacean.net/assets/rustacean-flat-gesture.png",
            alt: "Slide 3",
        },
    ];
    function next() {
        nextSlide();
        stopInterval();
        startInterval();
    }

    function previous() {
        PreviousSlide();
        stopInterval();
        startInterval();
    }

    function PreviousSlide() {
        currentSlide = (currentSlide - 1) % slides.length;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
    }
    function startInterval() {
        interval = setInterval(() => {
            nextSlide();
        }, delay);
    }
    function stopInterval() {
        clearInterval(interval);
    }
    onMount(() => {
        startInterval();
    });
    onDestroy(() => {
        stopInterval();
    });
</script>

<div class="carousel w-[500px] h-[400px]">
    <button
        type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        on:click={previous}
    >
        <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
            <svg
                aria-hidden="true"
                class="w-5 h-5 text-white sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                /></svg
            >
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button
        type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        on:click={next}
    >
        <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
            <svg
                aria-hidden="true"
                class="w-5 h-5 text-white sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                /></svg
            >
            <span class="sr-only">Next</span>
        </span>
    </button>
    {#each slides as slide, index}
        {#if currentSlide === index}
            <img
                transition:fade
                src={slide.src}
                alt={slide.alt}
                class={index === currentSlide ? "active" : ""}
            />
        {/if}
    {/each}

    <div
        class="flex items-center gap-5 absolute bottom-0 w-full"
        style="--delay: {delay / 1000}s"
    >
        {#each slides as _, index}
            <div
                class="progress"
                class:active={currentSlide === index}
                class:passed={currentSlide > index}
            />
        {/each}
    </div>
</div>

<style>
    .carousel {
        position: relative;
    }
    .carousel img {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .carousel img.active {
        display: block;
    }
    .progress-bar {
        height: 4px;
    }

    @keyframes progress {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: 0 0;
        }
    }

    .progress {
        height: 4px;
        flex-grow: 1;
        border-radius: 4px;
        display: flex;
        background-image: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(88, 89, 104, 0.5) 50.001%,
            rgba(88, 89, 104, 0.5) 100%
        );
        background-repeat: no-repeat;
        background-size: 200%;
        background-color: #666;
        background-position: 100% 50%;
        animation-timing-function: ease;
        animation-delay: 0.2s;
        animation-duration: var(--delay);
    }

    .progress.active {
        animation-name: progress;
    }

    .progress.passed {
        background-position: 0 0;
    }
</style>
