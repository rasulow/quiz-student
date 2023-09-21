<template>
    <div>
        <v-btn
            elevation="0"
            style="color: #7FBA5E; border: 1px solid #7FBA5E; background-color: transparent"
            @click="logout"
        >
            <v-icon color="#7FBA5E"> mdi-logout </v-icon>
            Logout
        </v-btn>
    </div>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';

export default {
    data: () => ({
        Toast: Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }),
    methods: {
        async logout() {
            await axiosInstance.delete('/auth/logout/')
            .then(() => {
                localStorage.removeItem('token')
                this.$router.push('/login')
                this.Toast.fire({
                    icon: 'success',
                    title: 'Student is logged out'
                  })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
}
</script>

<style>

</style>