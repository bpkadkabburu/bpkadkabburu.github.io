<template>
    <div class="container">
        <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4 img-fluid" :src="buruPng" alt="kabupaten buru" height="125" width="125">
            <h2>Konversi Bilangan</h2>
        </div>
        <div class="row">
            <div class="col-sm-12 mb-2">
                <label for="bilangan">Bilangan</label>
                <input type="text" class="form-control" v-model="bilangan" @keyup="convert()">
            </div>
            <div class="col-sm-12 mb-1">
                <button class="btn btn-primary" @click="copy()">{{copied ? "copied!" : "Copy"}}</button>
            </div>
            <div class="col-sm-12">
                <textarea type="text" class="form-control" v-model="terbilang" id="terbilang"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import buru from "../../assets/images/buru.png"
import angkaTerbilang from '@develoka/angka-terbilang-js';
export default {
    data: () => ({
        bilangan: "",
        terbilang: "",
        copied:false,
        buruPng: buru,
    }),
    methods:{
        convert(){
            let regex = /^[0-9.,]+$/;
            if(regex.test(this.bilangan)){
                let pureNumber = this.bilangan.split(".").join("").split(",").join(".")
                let format = Intl.NumberFormat('id-ID', {style:"currency", currency:"IDR"}).format(pureNumber)
                format = format.replace("Rp", "Rp.")
                this.terbilang = angkaTerbilang(pureNumber)
                this.terbilang = `${format} (${this.terbilang.charAt(0).toUpperCase()}${this.terbilang.slice(1)} rupiah)`
            } else {
                this.bilangan = ""
                this.terbilang = ""
            }
        },
        copy(){
            let kalimat = document.getElementById("terbilang")
            kalimat.select()
            document.execCommand('copy')
            this.copied = true
            setTimeout(() => {
                this.copied = false
            }, 1000);
        }
    }
}
</script>