<template>
    <v-app style="background-color: #faf9f7;">
        <v-row no-gutters class="d-flex align-center pa-5">
            <div class="countdown">
                {{ hours }}:{{ minutes }}:{{ seconds }}
            </div>
            <v-spacer/>
            <v-btn
                elevation="0"
                color="red"
                style="color: white"
                @click="sendResult"
            >
                Finish him!!!
            </v-btn>
        </v-row>
        <div 
            class="question-number"
        >
            {{ step + 1 }}/{{ questions.length }}
        </div>
        <v-container 
            style="height: 100%;" 
            class="mt-10"
        >
            <v-card
                class="mx-auto"
                style="padding: 20px;background-color: transparent;"
                min-width="500"
                elevation="0"
            >
                <v-window v-model="step">
                    <v-window-item
                        v-for="(item, index) in questions"
                        :key="index"
                        :value="index"
                    >
                        <v-card-title
                            class="pa-0 mb-10 question"
                        >
                            {{ item.question_text }}
                        </v-card-title>
                        {{ item.result }}
                        <v-radio-group
                            v-model="item.result"
                        >
                            <div 
                                class="pa-2 d-flex justify-center align-center"
                            >
                                <div style="margin-right: 150px;">
                                    <v-radio
                                        :label="item.option1"
                                        :value="1"
                                        :ripple="false"
                                        color="#7FBA5E"
                                        class="mb-4"
                                    />
                                    <v-radio
                                        :label="item.option2"
                                        :value="2"
                                        :ripple="false"
                                        color="#7FBA5E"
                                    />
                                </div>
                                <div style="margin-left: 150px;">
                                    <v-radio
                                        :label="item.option3"
                                        :value="3"
                                        :ripple="false"
                                        color="#7FBA5E"
                                        class="mb-4"
                                    />
                                    <v-radio
                                        :label="item.option4"
                                        :value="4"
                                        :ripple="false"
                                        color="#7FBA5E"
                                    />
                                </div>
                            </div>
                        </v-radio-group>
                    </v-window-item>
                </v-window>

                
                <v-card-actions>
                    <v-btn
                        v-if="step > 0"
                        color="#7FBA5E"
                        variant="flat"
                        @click="step--"
                        style="color: white;"
                        elevation="0"
                    >
                        Back
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="step < questions.length-1"
                        color="#7FBA5E"
                        variant="flat"
                        @click="step++"
                        style="color: white;"
                        elevation="0"
                    >
                        Next
                    </v-btn>    
                </v-card-actions>
            </v-card>
        </v-container>
    </v-app>
</template>
    

<script src="./QuizPage.js"/>

<style scoped src="./QuizPage.css"/>