<script>
	import { AUTH } from "./firebase";
	import LoginPage from "./Pages/LoginPage.svelte";
	import AppPage from "./Pages/AppPage.svelte";
	import LoadSpinner from "./utility/LoadSpinner.svelte";
	import ProcessSpinner from "./utility/ProcessSpinner.svelte";
    import {registerListener , EVENTS} from './EventManager';
	import { onMount } from "svelte";

	let currentUser;
	let isProcessing = false;
	let showInitLoad = true;

	const showSpinner = () =>  {
    	isProcessing = true;
		isProcessing = isProcessing;
	}

	const hideSpinner = () =>  {
    	isProcessing = false;
		isProcessing = isProcessing;
	}

	AUTH.onAuthStateChanged((user) => {
		if (user && user.uid) {
			currentUser = user;
		} else {
			currentUser = null;
		}
		setTimeout(() => {
			showInitLoad = false;
		}, 500);
	});

	onMount(() => {
		registerListener(EVENTS.SHOW_SPINNER,showSpinner);
		registerListener(EVENTS.HIDE_SPINNER,hideSpinner);
	});

</script>

<main>
	<ProcessSpinner show={isProcessing}/>
	<LoadSpinner show={showInitLoad}/>
	
	{#if !showInitLoad}
		{#if currentUser}
			<AppPage/>
			{:else}
			<LoginPage />
		{/if}
	{/if}
</main>
