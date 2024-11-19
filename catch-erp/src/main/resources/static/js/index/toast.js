/**
 * 토스트 그리드 설정
 */

 //열추가하기 버튼
//열을 추가하는 이벤트
/*
document.querySelector('.appendRowBtn').addEventListener('click',function(){
	grid.appendRow();
})
//열을 삭제하는 이벤트
 
document.querySelector('.deleteRowBtn').addEventListener('click',  function () {
	 grid.removeCheckedRows();
	 
	refreshRowNum();		
	
})
*/
/*
//열을 추가후 체크박스에 다시 숫자부여하는 코드
function refreshRowNum () {
	 window.setTimeout(function () {
	let checkList = document.querySelectorAll('.countCheck')
	let num = 1;
	checkList.forEach(items => {
		items.innerText = num;
		num += 1;
	})
		
	 }, 50)
}
*/

//숫자타입 인풋
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



//숫자있는 체크박스
  class girdCheckbox {
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

  



//토스트 컬럼 타입 정의(시간)
class gridTime {
constructor(props) {
    const el = document.createElement('input');

    el.type = 'time';
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
//토스트 컬럼 타입 정의 (날짜)
class gridDate {
constructor(props) {
    const el = document.createElement('input');

    el.type = 'date';
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