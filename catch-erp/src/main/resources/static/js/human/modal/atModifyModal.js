/**
 * 
 */

 
 const atModifyModal = new bootstrap.Modal(document.getElementById('atModifyModal'))
 


        //토스트 컬럼 타입 정의(시간)

        const atModifyGrid = new Grid({
        el: document.getElementById('atModifyGrid'), // Container element
        scrollX: true,
        scrollY: false,
        width:1100,
        columns: [
            {
            header: '근태기록번호',
            name: 'attHistoryCode',
            hidden:true
            },
            {
            header: '사원번호',
            name: 'employeeCode',
            hidden:true
            },
            {
		    header:'사원아이디',
		    name:'employeeId',
		    ignored:true
			},
            {
            header: ' 성명',
            name: 'name',
            ignored:true
            },
            {
            header: '날짜',
            name: 'attendanceDate',
	        editor: {
	          type:'datePicker',
	          options:{
	          	language: 'ko'
	          	},
	          }
            },
            {
            header: '근태유형코드',
            name: 'attCode',
            hidden:true
            },
            {
			header:'근태유형',
			name:'attName',
			ignored:true
			},
            {
            header: '출근시간',
            name: 'attendanceTime',
            editor: {
            type: gridTime,
            }
            },
            {
            header: '퇴근시간',
            name: 'leaveTime',
            editor: {
            type: gridTime,
            }
            },
            {
            header: '총근로시간',
            name: 'totalWorktime',
            editor: {
            type: gridTime,
            }
            },
            {
            header: '연장근로시간',
            name: 'overtimeWorktime',
            editor: {
            type: gridTime,
            }
            },
            {
            header: '심야근무시간',
            name: 'nightWorktime',
            editor: {
            type: gridTime,
            }
            },
            {
            header: '주간근무시간',
            name: 'weekendWorktime',
            editor: {
            type: gridTime,
            }
            }
        ],
        data: [
        ]
        });
        
//그리드 데이터 불러오기 함수
async function dataToatModifyGrid (code) {
	await fetch("/employees/att/"+code)
	      .then(data => data.json())
	      .then(data => {
			atModifyGrid.resetData([data])
			console.log('왜안됨?')
		  })
}
