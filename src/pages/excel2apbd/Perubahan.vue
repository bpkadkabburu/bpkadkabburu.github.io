<template>
    <div class="container">
        <div class="mt-5 py-5 text-center">
            <h2>Konversi Lampiran 1 Perbup ke Konsideran Perbup APBD sesuai permendagri 64 Tahun 2020</h2>
        </div>
        <div class="row">
            <div class="col-sm-12 mb-2">
                <label class="form-label" for="excel-file">Excel File</label>
                <input class="form-control" type="file" name="excelapbd" id="excelapbd" @change="convert">
            </div>
            <div class="col-sm-12 mb-1">
                {{ converted? "sedang mengkonversi ...": "" }}
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-md-6">
                        <vue-json-pretty :data="fileJson" />
                    </div>
                    <div class="col-md-6">
                        <vue-json-pretty :data="fileNewJson" />
                    </div>
                </div>               
            </div>
        </div>
    </div>
</template>
<script>
import { read, utils } from "xlsx";
import angkaTerbilang from '@develoka/angka-terbilang-js';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default{
    data:() => ({
        converted:false,
        fileJson: {},
        fileNewJson: {},
        inc: 0,
        huruf: 97,
        temp: [],
        pasal: 1,
    }),
    components: {
        VueJsonPretty,
    },
    methods:{
        resetCounter(){
            this.inc = 0
            this.huruf = 97
            this.temp = []
        },
        terbilangAngka(angka){
            let pureNumber = parseInt(angka)
            let format = Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(pureNumber)
            format = format.replace("Rp", "Rp.")
            let isNegatif = format.startsWith('-')
            if (isNegatif) {
                pureNumber *= -1
                format = format.replace("-Rp.", "Rp. (") + ")"
            }
            let terbilang = angkaTerbilang(pureNumber)
            return `${format} (${terbilang.charAt(0).toUpperCase()}${terbilang.slice(1)} rupiah)`
        },
        ucwords(mySentence){
            if(mySentence === mySentence.toUpperCase()){
                const words = mySentence.toLowerCase().split(" ")
                
                return words.map((word) => {
                    return word[0].toUpperCase() + word.substring(1)
                }).join(" ");
            } else {
                return mySentence
            }
        },
        async convert(e){
            this.converted = true
            const xlf = e.target.files[0]
            const xlb = await xlf.arrayBuffer()
            const wb = read(xlb)
            let data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            let newData = data.filter((d) => {
                let kode = d.kode + ""
                if(kode.length !== 17){
                    return d
                }
            }).map((d) => {
                let sebelum_perubahan_terbilang = this.terbilangAngka(d.sebelum_perubahan)
                let setelah_perubahan_terbilang = this.terbilangAngka(d.setelah_perubahan)
                let kode = d.kode + ""
                let panjang = kode.length
                let induk = 0
                if(panjang !== 1){
                    if(panjang === 3){
                        induk = kode.substring(0,1)
                    }else if(panjang === 6){
                        induk = kode.substring(0, 3)
                    }else if(panjang === 9){
                        induk = kode.substring(0, 6)
                    }else if(panjang === 12){
                        induk = kode.substring(0, 9)
                    }
                }
                return {
                    'induk': induk,
                    'kode': d.kode,
                    'panjang': panjang,
                    'uraian': this.ucwords(d.uraian),
                    'sebelum_perubahan': d.sebelum_perubahan,
                    'sebelum_perubahan_terbilang': sebelum_perubahan_terbilang,
                    'setelah_perubahan': d.setelah_perubahan,
                    'setelah_perubahan_terbilang': setelah_perubahan_terbilang 
                }
            })

            let pasal = 3
            let result = newData.filter((d) => {
                if(d.panjang !== 12){
                    d.pasal = pasal++
                    return d
                }
            })

            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                element.children = []
                let filter = newData.filter(d => {
                    if(d.induk == element.kode){
                        return d
                    }
                })

                filter.map((d, i) => {
                    if(filter.length !== 1){
                        d.huruf = String.fromCharCode((97 + i))
                        d.ayat = i + 2
                    } else {
                        d.huruf = 0
                        d.ayat = 0
                    }
                    d.pasalSebelum = element.pasal
                    if(d.panjang === 3){
                        if (d.ayat === 0) {
                            d.dimaksud = `Pasal ${d.pasalSebelum}`
                        } else {
                            d.dimaksud = `Pasal ${d.pasalSebelum} huruf ${d.huruf}`
                        }
                    } else {
                        if(d.ayat === 0){
                            d.dimaksud = `Pasal ${d.pasalSebelum}`
                        } else {
                            d.dimaksud = `Pasal ${d.pasalSebelum} ayat (${d.ayat})`
                        }
                    }

                    d.kalimat = `Anggaran ${d.uraian} sebagaimana dimaksud ${d.dimaksud} direncanakan sebesar ${d.setelah_perubahan_terbilang}`
                    
                    return d
                })

                let deepCopy = JSON.parse(JSON.stringify(filter))
                
                deepCopy.map((d, i) => {
                    d.kalimat = `Anggaran ${d.uraian} sebagaimana dimaksud pada ayat (1) huruf ${d.huruf} direncanakan sebesar ${d.setelah_perubahan_terbilang}`
                })

                element.children.push(...deepCopy)
            }

            let finalResult = result.filter((d, i) => {
                if(d.sebelum_perubahan - d.setelah_perubahan != 0){
                    return d
                }
            })

            this.fileJson = data
            this.fileNewJson = finalResult
            this.converted = false
        }
    }
}
</script>