<template>
    <v-app style="background-color: #faf9f7;">
        <div class="d-flex justify-center">
            <SideBar/>
            <v-img 
                v-if="exams.status_code == 204"
                src="@/assets/no-data.svg"
                style="position: absolute;width: 50%"
            />
            <v-container fluid style="padding: 30px 100px 0px 100px;">
                <v-row no-gutters class="ma-5">
                    <div style="color: #323b50; font-size: 25px" v-if="exams.length > 0">Exams</div>
                    <v-spacer />
                    <LogoutComponent/>
                </v-row>
                <div
                    v-if="exams.status_code != 204"
                >
                    <v-card 
                        elevation="0"
                        width="100%"
                        color="white"
                        class="exams pa-5 mb-4"
                        v-for="(item, i) in exams"
                        :key="i"
                        @click="quiz(item.id)"
                    >
                        <v-icon color="#4FBA5E" class="question mr-4" size="40">mdi-help</v-icon>
                        <div>
                            <v-card-title 
                                class="pa-0"
                                style="font-weight: 400; font-size: 20px;"
                            >
                                {{ item?.name }}
                            </v-card-title>
                            <v-card-title 
                                class="pa-0 mt-2"
                                style="font-weight: 200; font-size: 15px"
                            >
                                {{ item?.description }}
                            </v-card-title>
                        </div>
                        <v-spacer/>
                        <div class="exam-duration ml-4">
                            {{ item?.time }}
                        </div>
                    </v-card>
                </div>
            </v-container>  
        </div>
    </v-app>
</template>

<script src="./ExamPage.js"/>

<style scoped src="./ExamPage.css"/>