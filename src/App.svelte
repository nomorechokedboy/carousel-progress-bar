<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let currentSlide = 0;
    let interval: NodeJS.Timeout;
    const delay = 5000; // time in milliseconds between slide changes
    const progressStep = 10; // time in milliseconds for each progress bar step
    let progressBarWidth = [0, 0, 0];

    const slides = [
        {
            src: "https://rustacean.net/assets/cuddlyferris.png",
            alt: "Slide 1",
        },
        {
            src: "https://static-00.iconduck.com/assets.00/golang-icon-398x512-eygvdisi.png",
            alt: "Slide 2",
        },
        { src: "https://golang.company/favicon.ico", alt: "Slide 3" },
    ];

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        if (currentSlide === 0) {
            for (let i = 0; i < progressBarWidth.length; i++) {
                progressBarWidth[i] = 0;
            }
        }
    }

    function startInterval() {
        interval = setInterval(() => {
            nextSlide();
            progressBarWidth[currentSlide] = 0;
        }, delay);
    }

    function stopInterval() {
        clearInterval(interval);
    }

    onMount(() => {
        startInterval();

        // Increase the progress bar width every `progressStep` milliseconds
        setInterval(() => {
            if (progressBarWidth[currentSlide] < 100) {
                progressBarWidth[currentSlide] += (progressStep * 100) / delay;
            }
        }, progressStep);
    });

    onDestroy(() => {
        stopInterval();
    });
</script>

<div class="carousel w-[500px] h-[400px]">
    {#each slides as slide, index}
        <img
            src={slide.src}
            alt={slide.alt}
            class={index === currentSlide ? "active" : ""}
        />
    {/each}

    <div class="flex items-center gap-5 absolute bottom-0 w-full">
        {#each slides as _, index}
            <div class="progress-bar bg-white" style={`width: ${100 / 3}%`}>
                <div
                    class="progress-bar bg-blue-500 absolute"
                    style={`width: ${progressBarWidth[index] / 3}%`}
                />
            </div>
            <span>Svelte</span>
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
</style>

