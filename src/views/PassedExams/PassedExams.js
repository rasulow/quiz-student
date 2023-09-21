import Swal from "sweetalert2";
import LogoutComponent from '@/components/LogoutComponent';
import SideBar from '@/components/sidebar/SideBar';
import axios from "axios";

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
      await this.getPassedExams()
    },
    methods: {
        async getPassedExams() {
          await axios.get('/exam/passed/')
          .then((res) => {
            this.exams = res.data
            console.log(this.exams)
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    components: {
        LogoutComponent,
        SideBar    
    }
}