<template>
  <div class="container">
     <table>
            <tr>
             <th><span></span> 작성자 </th>
                 <td> <input type="text" id="SignUp_name" placeholder="홍길동"  autocomplete=”off”> </td>
            </tr>
            <tr>
                 <th> 날짜 </th>
                <td> <input type="text" id="SignUp_frrn" placeholder="앞 6자리">
                     -
                        <input type="text" id="SignUp_brrn" placeholder="뒤 7자리" > </td>
                <td> <button @click="Check_SignUp_name">중복확인</button></td>
            </tr>
            <tr class="addressbox">
                    <th> 주소 </th>
                    <td> 
                    <div style="display: flex;">
                    <input type="hidden" id="sample6_postcode" placeholder="우편번호" readonly>
                    
                    </div> 
                    <input type="text" id="sample6_address" style="width: 69%" v-model="common.address"  placeholder="주소" ><input type="button" id="sample6_btn" @click="sample6_execDaumPostcode()" value="주소 찾기"><br>
                    <input type="button" id="Address_Success" @click="Search_Marker" value="장소 확정">
                    <input type="hidden" id="sample6_detailAddress" placeholder="상세주소">
                    <input type="hidden" id="sample6_extraAddress" placeholder="참고항목" readonly>
                    </td>
            </tr>
            <!-- 카카오맵 -->
            <tr>
               <td colspan='3'>
                <KakaoMap id="map" v-bind:addressdata="common.address" :options="mapOption"></KakaoMap>
               </td>
            </tr>
            <tr>
                <textarea></textarea>
            </tr>
    </table>
    <div>
     <button>등록</button>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store';
import KakaoMap from "../../components/KakaoMap.vue";


export default {
    name:'reg_FleaMarket',
    components:{
        KakaoMap
    },
    data() {
        return {
            mapOption:{
                center:{
                    lat:33.450701,
                    lng:126.570667,
                },
                level:8,            
            },
            common:{
                address : ''
            }
        }
    },
    props:{
        
    },
    mounted(){
    
            // api 스크립트 소스 불러오기 및 지도 출력
            if (window.kakao && window.kakao.maps) {
                this.loadMap();
            } else {
                this.loadScript();
            }
        
    },
    created(){
          
    },
    methods:{
        //주소
         sample6_execDaumPostcode() {

            new daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                        // 조합된 참고항목을 해당 필드에 넣는다.
                        document.getElementById("sample6_extraAddress").value = extraAddr;

                    } else {
                        document.getElementById("sample6_extraAddress").value = '';
                    }
                   
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                    
                }


            }).open();
        },
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
        

        Search_Marker() {
            
            var geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(this.common.address, function (result, status) {

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
        
       
    }
}
</script>

<style scoped>
    .container{
        /* background: red; */
        width: 70%;
        margin: 0 auto;
        height: 80vh;
    }
    table {
       position: relative;
    top: 46%;
    left: 54%;
    transform: translate(-50%,-50%);
    font-size: 32px;
    width: 50%;
    height: 30%;
    background: rgb(189, 179, 179);
    }
        /* background: red; */

    table tr{
        /* border : 1px solid gray; */
    }

    table tr input[type=text]{
        width: 80%;
        height: 20px;
        border-radius: 5px;
        padding: 6px;
    }


    /*카카오지도 */
    #map {
    width: 66%;
    height: 300px;
    margin: 0 auto;
}

</style>