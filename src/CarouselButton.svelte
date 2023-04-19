<script lang="ts">
    export let className = "";
</script>

<button
    class="bg-transparent touch-manipulation inline-flex cursor-pointer no-underline {className}"
>
    <slot />
</button>
