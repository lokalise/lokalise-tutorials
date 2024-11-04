<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { get } from "svelte/store";

	const languageNames = {
    en: "English",
    fr: "French",
    ar: "Arabic"
  };

  function switchToLanguage(newLanguage) {
    // Get the canonical (untranslated) path
    const canonicalPath = i18n.route(get(page).url.pathname);
    
    // Resolve the path for the selected language
    const localizedPath = i18n.resolveRoute(canonicalPath, newLanguage);
    
    // Navigate to the localized path
    goto(localizedPath);
  }

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>

<nav>
	<ul>
		{#each availableLanguageTags as lang}
			<li><a 
				href="#"
				hreflang={lang}
				aria-current={lang === languageTag() ? "page" : undefined}
				onclick={(event) => {
					event.preventDefault();
					switchToLanguage(lang);
				}}
			>
				{languageNames[lang]}
			</a></li>
		{/each}
	</ul>
</nav>
