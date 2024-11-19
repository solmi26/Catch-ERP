/**
 * 
 */

 
 const atModifyModal = new bootstrap.Modal(document.getElementById('atModifyModal'))
 


        //토스트 컬럼 타입 정의(시간)

        const atModifyGrid = new Grid({
        el: document.getElementById('atModifyGrid'), // Container element
        scrollX: true,
        scrollY: false,
        
        columns: [
            {
            header: '사원번호',
            name: 'employeeCode'
            
            },
            {
            header: ' 성명',
            name: 'employeeName',
            },
            {
            header: '날짜',
            name: 'attendanceDate',
            editor: {
            type: gridDate,
            }
            },
            {
            header: '근태유형',
            name: 'attCode',
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
            }
        ],
        data: [
            {
            employeeCode: '2024-001',
            employeeName: '유석진',
            attendanceDate:'2024.11.17',
            attCode:'휴가',
            attendanceTime:'08:54',
            leaveTime:'18:00'

            }
        ]
        });
