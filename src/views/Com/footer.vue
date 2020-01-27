<template>
	<v-footer dark padless>
		<v-card flat tile class="text-center" width="100%">
			<v-card-text>
				<v-btn icon @click="window.open('')">
					<v-icon size="24px">mdi-github-circle</v-icon>
				</v-btn>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-text>
				{{ new Date().getFullYear() }} - <strong>Mobbing</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>
