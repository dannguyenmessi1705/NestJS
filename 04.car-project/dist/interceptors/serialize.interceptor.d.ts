import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClassConstructor } from 'class-transformer';
export declare function Serialize(dto: ClassConstructor<unknown>): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: ClassConstructor<unknown>);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
