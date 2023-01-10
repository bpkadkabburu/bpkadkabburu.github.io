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
                        <pre>
                            {{ fileJson }}
                        </pre>
                    </div>
                    <div class="col-md-6">
                        <pre>
                            {{ fileNewJson }}
                        </pre>
                    </div>
                </div>               
            </div>
        </div>
    </div>
</template>
<script>
import { read, utils } from "xlsx";
import angkaTerbilang from '@develoka/angka-terbilang-js';
export default{
    data:() => ({
        converted:false,
        fileJson: Object,
        fileNewJson: Object
    }),
    methods:{
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
                let pureNumber = d.jumlah
                let format = Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(pureNumber)
                format = format.replace("Rp", "Rp.")
                let terbilang = angkaTerbilang(pureNumber)
                terbilang = `${format} (${terbilang.charAt(0).toUpperCase()}${terbilang.slice(1)} rupiah)`
                let kode = d.kode + ""
                return {
                    'kode': d.kode,
                    'panjang': kode.length,
                    'uraian': d.uraian,
                    'jumlah': d.jumlah,
                    'terbilang': terbilang
                }
            })
            this.fileJson = data
            this.fileNewJson = newData
            this.converted = false
        }
    }
}
</script>