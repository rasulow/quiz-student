import CryptoJS from "crypto-js"
import axios from "axios"
import Swal from "sweetalert2"
export default {
    data: () => ({
        step: 0,
        questions: [],
        quiz_detail: [],
        time: '',
        radios: null,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
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
    created() {
        this.quiz_details()
    },
    computed: {
        hours() {
          if (this.startHour.toString().length <= 1)
            return '0' + this.startHour
          else
            return this.startHour
        },
        minutes() {
          if (this.startMinute.toString().length <= 1)
            return '0' + this.startMinute
          else
            return this.startMinute
        },
        seconds() {
          if (this.startSecond.toString().length <= 1)
            return '0' + this.startSecond
          else
            return this.startSecond
        }
      },
      
    mounted() {
      this.updateCountdown()
      setInterval(this.updateCountdown, 1000) // Update countdown every second
    },
    
    methods: {
        async quiz_details() {
            const secret_key = '0123456789abcdef0123456789abcdef'
            let decrypted_id = CryptoJS.AES.decrypt(localStorage.getItem('id'), secret_key).toString(CryptoJS.enc.Utf8)
            
            await axios.get('/exam/' + decrypted_id + '/')
            .then((response) => {
                this.quiz_detail = response.data
                console.log(this.quiz_detail)
                const [hours, minutes, seconds] = this.quiz_detail.time.split(':');
                this.startHour = Number(hours) || 0;
                this.startMinute = Number(minutes) || 0;
                this.startSecond = Number(seconds) || 0;
            })
            .catch((err) => {
                console.log(err)
            })

            await axios.get('/question/' + decrypted_id + '/')
            .then((res) => {
                this.questions = res.data
            })
            .catch((err) => {
                console.log(err)
            })
            
        },

        updateCountdown() {
            if (this.startSecond > 0) 
              this.startSecond -= 1
            else if (this.startMinute > 0) {
              this.startMinute -= 1
              this.startSecond = 59
            }
            else if (this.startHour > 0) {
              this.startHour -= 1
              this.startMinute = 59
              this.startSecond = 59
            }
        },

        async sendResult() {
            await axios.post('/question/result/', this.questions)
            .then((res) => {
                console.log(res.data)
                axios.delete('/auth/logout/')
                .then(() => {
                    localStorage.removeItem('token')
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Student is logged out'
                    })
                    this.$router.push('/login')
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    components: {
    }
}