package com.cherp.app.stck.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.service.SalesService;
import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.web.BussController;
import com.cherp.app.stck.service.StockService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*재고조정페이지 Controller*/

@Slf4j
@Controller
<<<<<<< HEAD:catch-erp/src/main/java/com/cherp/app/stck/web/StackAdjustController.java
public class StackAdjustController {

=======
@RequiredArgsConstructor
public class StockAdjustController {
	
	private final StockService stockAdjustService;
	private final ClientService clientServcie;
	
	
>>>>>>> N_KW:catch-erp/src/main/java/com/cherp/app/stck/web/StockAdjustController.java
}
