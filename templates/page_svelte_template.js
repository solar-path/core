export let pageSvelteTemplate = `
<script lang="ts">
    {FORM_IMPORT}
    {DATA_IMPORT}
    // place your js code here
    
</script>

<svelte:head>
    <title>{NAME_CAP}</title>
    <meta name="description" content="{NAME_CAP} page" />
</svelte:head>

<h1>{NAME_CAP}</h1>

  {FORM_PLACEMENT}

  {MAIN_CONTENT}

  {LINKS}
`;