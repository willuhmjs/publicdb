<script lang="ts">
    export let type: 'warning' | 'error';
</script>

<div class={type}>
    <slot />
</div>

<style lang="scss">
    div {
        padding: 1.25rem;
        color: inherit;
        background-color: gray;
        border-left: 0.25rem solid gray;
    }

    .warning {
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffe69c;
    }

    .error {
        color: #58151c;
        background-color: #f8d7da;
        border-color: #f1aeb5;
    }
</style>