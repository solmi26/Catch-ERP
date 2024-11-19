/**
 * (stackInquery.html) - 재고조회조정 페이지에 적용되는 JS
 */
 
/*==========================================
	  공통사용되는 토스트 UI Grid 렌더러 Class
============================================*/

    class ImageRenderer {
        constructor(props) {
            this.el = document.createElement('img');
            this.el.src = props.value; // 이미지 URL을 props.value로 설정
            this.el.style.width = '130px'; // 이미지 크기 조절
            this.el.style.height = '100px';
        }

        getElement() {
            return this.el;
        }
    }

    class CustomTextEditor {
        constructor(props) {
            const el = document.createElement('input');
            const { maxLength } = props.columnInfo.editor.options;

            el.type = 'text';
            el.maxLength = maxLength;
            el.value = String(props.value);

            this.el = el;
        }

        getElement() {
            return this.el;
        }

        getValue() {
            return this.el.value;
        }

        mounted() {
            this.el.select();
        }
    }
	
	class ButtonRenderer {
            constructor(props) {
                this.el = document.createElement('button');
                this.el.innerText = props.value;
                this.el.style.border = '1px solid gray';
                this.el.style.borderRadius ='3px';
                this.el.style.backgroundColor = 'white';
                this.el.onclick = () => {
                alert(`데이터이동 함수 필요`);
                };
            }

            getElement() {
                return this.el;
            }
    }
    
    //숫자타입 인풋 렌더러 (석진제작)
    class gridNumber {
		  constructor(props) {
		    const el = document.createElement('input');
		
		    el.type = 'number';
		    el.value = String(props.value);
			el.className = 'form-control from-control-sm'
		    this.el = el;
		  }
		
		  getElement() {
		    return this.el;
		  }
		
		  getValue() {
		    return this.el.value;
		  }
		
		  mounted() {
		    this.el.select();
		  }
	}
	
  //숫자있는 체크박스 (석진제작)
  class gridCheckbox {
    constructor(props) {
      const { grid, rowKey } = props;
	  
      const label = document.createElement('label');
      label.className = 'checkbox tui-grid-row-header-checkbox selectCheck countCheck';
      label.setAttribute('for', 'selectCheck'+String(rowKey));
      label.innerText = `${grid.getIndexOfRow(rowKey)+1}`;
      const hiddenInput = document.createElement('input');
      hiddenInput.className = 'hidden-input';
      hiddenInput.id = 'selectCheck'+String(rowKey);
	
      
      const customInput = document.createElement('span');
      customInput.className = 'custom-input';

      customInput.appendChild(hiddenInput);
      customInput.appendChild(label);

      hiddenInput.type = 'checkbox';
      label.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (ev.shiftKey) {
          grid[!hiddenInput.checked ? 'checkBetween' : 'uncheckBetween'](rowKey);
          return;
        }

        grid[!hiddenInput.checked ? 'check' : 'uncheck'](rowKey);
      });

      this.el = customInput;

      this.render(props);
    }

    getElement() {
      return this.el;
    }

    render(props) {
      const hiddenInput = this.el.querySelector('.hidden-input');
      const checked = Boolean(props.value);

      hiddenInput.checked = checked;
    }
  }
/*==========================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
============================================*/
document.addEventListener("DOMContentLoaded", function () {
    
    //모든 그리드 객체에서 사용될 const Grid, 테마 혹은 헤더변경 없으면 같은 것 사용.
	const Grid = tui.Grid;
	/*const filterOptions = {
	  type: 'text', // 필터 타입 (text, number, date 등)
	  operatorLabel: {
	    // 조건 한글화
	    Select All: '같음',
	    notEquals: '같지 않음',
	    contains: '포함',
	    startsWith: '시작 문자',
	    endsWith: '끝 문자',
	    lessThan: '보다 작음',
	    greaterThan: '보다 큼',
	  }
	};
	const filterOptions = {
		type: "text",
		operatorLabel: {
			 contains: '포함됨',
                     eq: '같음',
                     neq: '같지 않음',
                     startsWith: '시작함',
                     endsWith: '끝남',
                     greaterThan: '이후',
                     greaterThanOrEqualTo: '이후(포함)',
                     lessThan: '이전',
                     lessThanOrEqualTo: '이전(포함)'
		}
	}
	Grid.setLanguage('ko', {
                 Filter: {
                    
                 },
                 DatePicker: {
                     titles: {
                         today: '오늘',
                         clear: '지우기'
                     },
                     monthsLong: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                     monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                     dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                     dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
                 }
    });*/
    
	Grid.applyTheme('default',  {
            outline:{
            border : '#dee2e6'
        },
        cell: {
            normal: {
                border: '#dee2e6'
            },
            header: {
                background: '#f8f9fa',
                text: 'black'
            },
            focused: {
                background: '#f8f9fa',
                border: '#f64a4a'
            },
            evenRow: {
                background: 'white'
            },
            oddRow: {
                background: 'white'
            }
        }
    });
    
    const initGrid = () => {
        // 그리드 객체

    const grid = new Grid({
        el: document.getElementById('adjustmentGrid'),
        scrollX: true,
        scrollY: true,
        rowHeaders: [
	          {
	            type: 'checkbox',
	            header: `
	              <span class="custom-input">
	              <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
	            	<label for="all-checkbox" class="checkbox selectCheck">✔</label>
	          	</span>
	          `,
	            renderer: {
	              type: gridCheckbox
	            }
	          }
	    ],
        header: { height: 40 },
        bodyHeight: 500,
        rowHeight: 102,
        width: 'auto',
        contextMenu: null,
        /*rowHeaders: [{
                type: 'checkbox',
                header: "No.",
                width: 50,
                className:'border'
        }],*/
        columns: [
            {
                header: '품목코드',
                name: 'c1',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border'
                
            },
            {
                header: '품목명',
                name: 'c2',
                align: "center",
                width: 130,
                whiteSpace: 'normal'
            },
            {
                header: '규격',
                name: 'c3',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className:'border'
            },
            {
                header: '입고단가',
                name: 'c4',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border',
                validation: {
                    dataType: 'number'
                }
            },
            {
                header: '출고단가',
                name: 'c5',
                align: "center",
                width: 90,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border',
                validation: {
                    dataType: 'number'
                }
            },
            {
                header: '출하수량',
                name: 'c6',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number'
                },
                className:'border'
            },
            {
                header: '입고수량',
                name: 'c7',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                    max: 100
                },
                className:'border'
            },
            {
                header: '재고수량',
                name: 'c8',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className:'border'
            },
            {
                header: '이미지',
                name: 'c9',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border',
                renderer: {
                    type: ImageRenderer
                }
            },
            {
                header: '재고조정사유',
                name: 'c10',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border'              
            }
        ]
    	});

    	return grid;
	}

    // 그리드 설정
    const createdGrid = initGrid();

    // 샘플 데이터
    const sampleData = [
        {
			c1: 'A0000045',
            c2: '컵홀더',
            c3: '2023.01.01',
            c4: '컵홀더',
            c5: '12000',
            c6: '5',
            c7: '0',
            c8: '0',
            c9: '0',
            c10: '상품 출하'
        },
        {
			c1: 'A0000045',
            c2: '컵홀더',
            c3: '2023.01.01',
            c4: '컵홀더',
            c5: '12000',
            c6: '5',
            c7: '0',
            c8: '0',
            c9: '0',
            c10: '상품 출하'
        },
        {
			c1: 'A0000045',
            c2: '컵홀더',
            c3: '2023.01.01',
            c4: '컵홀더',
            c5: '12000',
            c6: '5',
            c7: '0',
            c8: '0',
            c9: '0',
            c10: '상품 출하'
        }
        
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid.resetData(sampleData);




	/*============================
    	StackInquery 거래처 모달 JS
    ==============================*/
    
    // 모달 관련 JavaScript
        const clientModal = document.getElementById('clientModal');

        //모달실행 시 grid refresh를 위한 코드
        document.getElementById('openClientModal').addEventListener('click', function() {
            window.setTimeout(function(){
                grid3.refreshLayout();
            }, 200) 
            window.setTimeout(function(){
                grid4.refreshLayout();
            }, 200)
        });

        let grid3; //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
        
        const initGrid3 = () => {
            // 그리드 객체
    
        grid3 = new Grid({
            el: document.getElementById("clientGrid"),
            scrollX: true,
            scrollY: true,
            header: { height: 40 },
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
            columns: [
                {
                    header: '거래처명',
                    name: 'c1',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                },
                {
                    header: '대표자명',
                    name: 'c2',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '회사 연락처',
                    name: 'c3',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border'
                },
                {
                    header: '담당자명',
                    name: 'c4',
                    align: "center",
                    width: 110,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '담당자 연락처',
                    name: 'c5',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '종목',
                    name: 'c6',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });
        return grid3;
    }

    // 그리드 설정
    const createdGrid3 = initGrid3();
    // 샘플 데이터
    const sampleData3 = [
        {
            c1: '태호물산',
            c2: '김태호',
            c3: '02-1234-5678',
            c4: '김영준',
            c5: '010-1234-1234',
            c6: '식기류 제조업',
        }
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid3.resetData(sampleData3);
    
    /*============================
    	StackInquery 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    var purchaseOrderModal = document.getElementById('purchaseOrderModal')
    purchaseOrderModal.addEventListener('show.bs.modal', function (event) {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function(){
            grid5.refreshLayout();
        }, 200) 
    })

    purchaseOrderModal.addEventListener('hidden.bs.modal', function (event) {
        // 모달이 완전히 숨겨진 후 실행할 코드
    })
    let grid5;
    const initGrid5 = () => {
		grid5 = new Grid({
            el: document.getElementById('itemGrid'),
            scrollX: true,
            scrollY: true,
            header: { height: 40 },
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
            columns: [
                {
                    header: '품목 코드',
                    name: 'c1',
                    align: "center",
                    width: 203,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                    
                },
                {
                    header: '품목명',
                    name: 'c2',
                    align: "center",
                    width: 203,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

        return grid5;
		
	}
    
    const createdGrid5 = initGrid5();

	// 샘플 데이터
	const sampleData5 = [
	    {
	        c1: 'A0000045',
	        c2: '컵홀더'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)
	createdGrid5.resetData(sampleData5);
    
    
    /*============================
    	StackInquery 구매내역 모달 JS
    ==============================*/
    var purchaseOrderModal = document.getElementById('purchaseOrderModal2')

	purchaseOrderModal.addEventListener('show.bs.modal', function (event) {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid6.refreshLayout();
	    }, 200) 
	})
    
    let grid6;
    const initGrid6 = () => {
		    grid6 = new Grid({
		    el: document.getElementById('purchaseGrid'),
		    scrollX: true,
		    scrollY: true,
		    header: { height: 40 },
		    bodyHeight: 500,
		    width: 'auto',
		    contextMenu: null,
		    rowHeaders: [{
		            type: 'rowNum',
		            header: "No.",
		            width: 50,
		            className:'border'
		    }],
		    columns: [
		        {
		            header: '구매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            renderer: {
		                type: ButtonRenderer
		            }
		            
		        },
		        {
		            header: '구매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            renderer: {
		                type: ButtonRenderer
		            }
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy.MM.dd',
		                    language: 'ko'
		                }
		            }
		        },
		        {
		            header: '품목명',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '거래처명',
		            name: 'c5',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '수량',
		            name: 'c6',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '단가',
		            name: 'c7',
		            align: "center",
		            width: 200,
		            whiteSpace: 'normal',
		            editor: 'text',
		            className:'border',
		            formatter: function(e){
		                return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		            },
		        }
		    ]
		});
		
		return grid6;
    }
    
    const createdGrid6 = initGrid6();

	// 샘플 데이터
	const sampleData6 = [
	    {
        c1: 'A0000045',
        c2: 'A0000045-1',
        c3: '2023.01.01',
        c4: '컵홀더',
        c5: '12000',
        c6: '5',
        c7: '0'
        
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-2',
	        c3: '2023.01.02',
	        c4: '포장용기',
	        c5: '12000',
	        c6: '5',
	        c7: '0'
	       
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-3',
	        c3: '2023.01.03',
	        c4: '빨대',
	        c5: '12000',
	        c6: '5',
	        c7: '20000'
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-4',
	        c3: '2023.01.04',
	        c4: '컵(소형)',
	        c5: '12000',
	        c6: '5',
	        c7: '100000'
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-5',
	        c3: '2023.01.05',
	        c4: '컵(대형)',
	        c5: '12000',
	        c6: '5',
	        c7: '4000000'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)
	createdGrid6.resetData(sampleData6);
    /*============================
    	StackInquery 출하지시내역 모달 JS
    ==============================*/
    
    var salesOrderModal = document.getElementById('salesOrderModal')

	salesOrderModal.addEventListener('show.bs.modal', function (event) {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid7.refreshLayout();
	    }, 200) 
	})
    
    let grid7;
    const initGrid7 = () => {
		    grid7 = new Grid({
		    el: document.getElementById('salesGrid'),
		    scrollX: true,
		    scrollY: true,
		    header: { height: 40 },
		    bodyHeight: 500,
		    width: 'auto',
		    contextMenu: null,
		    rowHeaders: [{
		            type: 'rowNum',
		            header: "No.",
		            width: 50,
		            className:'border'
		    }],
		    columns: [
		        {
		            header: '판매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            renderer: {
		                type: ButtonRenderer
		            }
		            
		        },
		        {
		            header: '판매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            renderer: {
		                type: ButtonRenderer
		            }
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy.MM.dd',
		                    language: 'ko'
		                }
		            }
		        },
		        {
		            header: '품목명',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '거래처명',
		            name: 'c5',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '수량',
		            name: 'c6',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '단가',
		            name: 'c7',
		            align: "center",
		            width: 200,
		            whiteSpace: 'normal',
		            editor: 'text',
		            className:'border',
		            formatter: function(e){
		                return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		            },
		        }
		    ]
		});
		
		return grid7;
    }
    
    const createdGrid7 = initGrid7();

	// 샘플 데이터
	const sampleData7 = [
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-1',
	        c3: '2023.01.01',
	        c4: '컵홀더',
	        c5: '12000',
	        c6: '5',
	        c7: '0'       
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-2',
	        c3: '2023.01.02',
	        c4: '포장용기',
	        c5: '12000',
	        c6: '5',
	        c7: '0'
	       
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-3',
	        c3: '2023.01.03',
	        c4: '빨대',
	        c5: '12000',
	        c6: '5',
	        c7: '20000'
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-4',
	        c3: '2023.01.04',
	        c4: '컵(소형)',
	        c5: '12000',
	        c6: '5',
	        c7: '100000'
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-5',
	        c3: '2023.01.05',
	        c4: '컵(대형)',
	        c5: '12000',
	        c6: '5',
	        c7: '4000000'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)
	createdGrid7.resetData(sampleData7);
    
    
    /*================================
    	StackInquery 재고조정보고서 모달 JS
    ==================================*/
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });  

    document.getElementById('pdfButton').addEventListener('click', function() {
        const element = document.getElementById('reportContent');
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('재고조정보고서.pdf');
        });
    });
       
    /*============================
    	StackInquery 사원조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    let humanModalBtn = document.getElementById('humanModal')
    humanModalBtn.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function(){
            grid8.refreshLayout();
        }, 200) 
    })

    humanModalBtn.addEventListener('hidden.bs.modal', function () {
        // 모달이 완전히 숨겨진 후 실행할 코드
    })
    let grid8;
    const initGrid8 = () => {
		grid8 = new Grid({
            el: document.getElementById('humanGrid'),
            scrollX: true,
            scrollY: true,
            header: { height: 40 },
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
            columns: [
                {
                    header: '사원 코드',
                    name: 'c1',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                    
                },
                {
                    header: '성명',
                    name: 'c2',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '부서명',
                    name: 'c3',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

        return grid8;
		
	}
    
    const createdGrid8 = initGrid8();

	// 샘플 데이터
	const sampleData8 = [
	    {
	        c1: 'A20241205-1',
	        c2: '김기현',
	        c3: '개발팀'
	    }
	];	
	// 그리드에 데이터 넣기(출력)
	createdGrid8.resetData(sampleData8);
       
       
}); //End Point