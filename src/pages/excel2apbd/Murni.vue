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
            this.temp = []
        },
        terbilangAngka(angka) {
            let pureNumber = String(angka)
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
        ucwords(mySentence) {
            if (mySentence === mySentence.toUpperCase()) {
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
                    console.log(d)
                    return d
                }
            }).map((d) => {
                let jumlah_terbilang = this.terbilangAngka(d.jumlah)
                let kode = d.kode + ""
                let panjang = kode.length
                let induk = 0
                if(panjang !== 1){
                    if(panjang === 3){
                        induk = kode.substring(0, 1)
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
                    'jumlah': d.jumlah,
                    'jumlah_terbilang': jumlah_terbilang
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
                    return d
                })

                let deepCopy = JSON.parse(JSON.stringify(filter))

                deepCopy.map((d, i) => {
                    d.kalimat = `${d.uraian} sebagaimana dimaksud pada ayat (1) huruf ${d.huruf} direncanakan sebesar ${d.jumlah_terbilang}`
                })

                element.children.push(...deepCopy)
            }

            result = result.map((d) => {
                if (d.children.length === 1) {
                    let rincian = 'rincian objek';
                    if (d.panjang === 3) {
                        rincian = 'jenis'
                    } else if (d.panjang === 6) {
                        rincian = 'objek'
                    }
                    d.kalimat = `Anggaran ${d.uraian} sebagaimana dimaksud pada ${d.dimaksud} direncanakan sebesar ${d.jumlah_terbilang}, merupakan ${rincian} ${d.children[0].uraian}`
                    delete d.children
                } else {
                    d.terdiri = d.children.map((c, i) => {
                        return c.uraian
                    })
                    d.kalimatAyat = d.children.map((c, i) => {
                        return c.kalimat
                    })
                    d.kalimat = `Anggaran ${d.uraian} sebagaimana dimaksud pada ${d.dimaksud} direncanakan sebesar ${d.jumlah_terbilang}, terdiri atas:`
                    delete d.children
                }

                if (isNaN(d.pasal) && isNaN(d.pasalSebelum)) {
                    d.pasal = d.pasal.replace('A', 'B')
                }

                return {
                    pasal: d.pasal,
                    kalimat: d.kalimat,
                    terdiri: d.terdiri,
                    kalimatAyat: d.kalimatAyat
                }
            })

            this.fileJson = data
            this.fileNewJson = result
            this.converted = false
        }
    }
}
</script>