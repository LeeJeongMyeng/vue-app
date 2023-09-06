<template>
    <div>
        <h2>dd</h2>
    <!-- <div id="map"></div> -->
      <div> {{ addressdata }} </div>
    </div>
</template>

<script>
//import EventBus from '@/assets/js/EventBus';
export default {
    name: "KakaoMap", // 컴포넌트 이름 지정
    data() {
        return {
            // map 객체 설정
            map: null,
        };
    },
    props:['addressdata'],

    setup() { },
    created() { 
        
    },
    mounted() {
        // api 스크립트 소스 불러오기 및 지도 출력
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }
    },
    unmounted() { },
    methods: {
        // api 불러오기
        loadScript() {
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?appkey=8a93693b514b55e6af5ef4f64d5ce6be&autoload=false";
            script.onload = () => window.kakao.maps.load(this.loadMap);

            document.head.appendChild(script);
        },
        // 맵 출력하기
        loadMap() {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };

            this.map = new window.kakao.maps.Map(container, options);
            this.loadMaker();
        },
        // 지정한 위치에 마커 불러오기
        loadMaker() {
            const markerPosition = new window.kakao.maps.LatLng(
                33.450701,
                126.570667
            );

            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });

            marker.setMap(this.map);
        },
        
        Search_Marker(value){
            
            geocoder.addressSearch(value, function (result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        },
        check_address(){
            console.log(this.addressdata);
        }
        
    },
}
</script>

<style scoped>
#map {
    width: 66%;
    height: 300px;
    margin: 0 auto;
}
</style>