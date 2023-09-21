import axios from "axios";
import Swal from "sweetalert2";
import LogoutComponent from '@/components/LogoutComponent';
import SideBar from '@/components/sidebar/SideBar';
import SweetalertIcon from 'vue-sweetalert-icons';
import CryptoJS from "crypto-js";

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
        }),
        exams: []
    }),
    async created() {
        await this.getActiveExams()
    },
    methods: {

        async getActiveExams() {
            await axios.get('/exam/active/')
            .then((res) => {
                this.exams = res.data
                console.log(this.exams)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        async quiz(id) {
            Swal.fire({
                title: 'Are you ready?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
              })
              .then((result) => {
                if (result.isConfirmed) {
                    const secret_key = '0123456789abcdef0123456789abcdef'
                    let encrypted = CryptoJS.AES.encrypt(id.toString(), secret_key)
                    localStorage.setItem(
                        'id', 
                        encrypted
                    )
                    this.$router.push('/quiz')
                }
              })
              .catch((err) => {
                console.log(err)
                this.Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                })
              })
        }
    },
    components: {
        LogoutComponent,
        SideBar,
        SweetalertIcon    
    }
}