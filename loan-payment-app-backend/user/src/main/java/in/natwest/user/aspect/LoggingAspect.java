package in.natwest.user.aspect;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;

@Aspect
@Component //just a beam taking care of aspects
public class LoggingAspect {
    private Logger logger= LoggerFactory.getLogger(LoggingAspect.class);
    //Before execution of login
    @Pointcut(value="execution(* in.natwest.user.controller.UserProfileController .*(..))")
    public void userProfileController(){

    }
    @Before(value="userProfileController()")
    public void beforeAdviceMethod(JoinPoint joinpoint){
        logger.info("Inside before advice");
        logger.info("Target method object"+joinpoint.getSignature().getName());
    }
    @After(value="userProfileController()")
    public void afterAdviceMethod(JoinPoint joinpoint){
        logger.info("Inside after advice");
        logger.info("Target method object"+joinpoint.getSignature().getName());
    }
    @AfterReturning(value="userProfileController()"
    ,returning = "revalue")
    public void afterReturnAdviceMethod(JoinPoint joinpoint,Object revalue){
        logger.info("Inside after return advice");
        logger.info("Target method object"+joinpoint.getSignature().getName());
        logger.info("returned"+revalue);
    }
    @AfterThrowing(value="userProfileController()"
            ,throwing = "revalue")
    public void afterThrowAdviceMethod(JoinPoint joinpoint,Exception revalue){
        logger.info("Inside after throw return advice");
        logger.info("Target method object"+joinpoint.getSignature().getName());
        logger.info("returned"+revalue.getMessage());
    }
}
