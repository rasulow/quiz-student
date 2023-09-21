<template>
    <v-app style="background-color: #faf9f7;">
    <SideBar/>
    <v-container fluid>
        <v-row no-gutters class="ma-5">
            Home
            <v-spacer />
            <LogoutComponent/>
        </v-row>
    </v-container>
    </v-app>
</template>

<script src="./HomePage.js"/>

<style scoped src="./HomePage.css"/>