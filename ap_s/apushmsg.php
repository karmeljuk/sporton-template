<?php  

include "apconfig.php";
include "ap_api.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$namefrom = $nameto;  

	$nameto = "WebMaster";

	$message ="";


	if (isset($_GET['tmes'])){
		$mtitle ='['.htmlspecialchars($_GET['tmes']).']';
	}	
	
	
	$message .=	"<!DOCTYPE html><html><body><HEAD><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	$message .= "<h1>$mtitle</h1><table style=\"width:400px\">";
	foreach ($_GET as $param_name => $param_val) {
		
		$ss=" ".$param_name;
/*$pos = strpos($ss, 'field_');
		if ($pos > 0 ){*/
		$pieces = explode(":;:", $param_val);//$param_name
		if ($param_name!='tmes'&& $param_name!='p' && $param_name!='callback' && $param_name!='_')
		$message .= "<tr><td>".htmlspecialchars($pieces[0])."</td><td> ".htmlspecialchars($pieces[1])."</td></tr>";
		/*}*/
		//echo "Param: $param_name; Value: $param_va<br />\n";
		
	}
		
	$message .= "<tr><td>User IP</td><td> ".getRealIpAddr()."</td></tr>";	
	$message .="</table></body></html>";


	if (isset($_GET['tmes'])){
		$subject.='['.htmlspecialchars($_GET['tmes']).']';
	}
	//echo $_GET['tmes'];
	$rez = -1;
	
	if ($v_c==1){
		 $headers  = 'MIME-Version: 1.0' . "\r\n";
		 $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		 $headers .= 'From: '. $from . "\r\n" . 'Reply-To: '. $from . "\r\n" .  'X-Mailer: PHP/' . phpversion();
		 if (mail($to, $subject, $message, $headers)) 
				{$rez = 0;} else { $rez = 1; }	
	}else {
	$rez = authSendEmail($from, $namefrom, $to, $nameto, $subject, $message);}
	
	if($rez==0)
		{echo $_GET["callback"] . "(" . json_encode(array('error'=>'0')) . ")";}
		else
		{echo $_GET["callback"] . "(" . json_encode(array('error'=>'1')) . ")";}  
	
}
 

?>  
 
 
 