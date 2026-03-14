package com.example.LoanInfoService.aspect;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    private Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Before(value = "pointCut()")
    public void beforeAdviceMethod(JoinPoint joinPoint) {
        logger.info("Inside the before advice");
        logger.info("Target method is " + joinPoint.getSignature().getName());

//        logger.info(joinPoint.getSignature().getName() + " started executing");
    }


    @After(value = "pointCut()")
    public void afterAdviceMethod(JoinPoint joinPoint) {
        logger.info("Inside the After advice");
        logger.info("Target method is " + joinPoint.getSignature().getName());

        logger.info(joinPoint.getSignature().getName() + " completed execution");
    }

    @AfterReturning(value = "pointCut()", returning = "returnValue")
    public void afterReturningAdviceMethod(JoinPoint joinPoint, Object returnValue){
        logger.info("Inside the After Returning advice");
        logger.info("Target method is "+ joinPoint.getSignature().getName());
        logger.info("Returned value is "+ returnValue);
    }

    @AfterThrowing(value = "execution(* com.example.LoanInfoService.service.LoanInfoServiceImpl .*(..))", throwing = "exception")
    public void afterThrowingAdviceMethod(JoinPoint joinPoint, Exception exception){
        logger.info("Inside the After Throwing advice");
        logger.info("Target method is "+ joinPoint.getSignature().getName());
        logger.info("Exception thrown "+ exception.getMessage());
    }

    @Pointcut(value = "execution(* com.example.LoanInfoService.controller.LoanInfoController .*(..))")
    public void pointCut(){}

}


