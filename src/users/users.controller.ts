import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UpdateUserDto } from "./dtos/UpdateUser.dto";
import { Prisma } from "@prisma/client";

@Controller('users')
export class UserController{

    constructor(private usersService:UserService){}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto:Prisma.UserCreateInput){
        return this.usersService.createUser(createUserDto)
    }


    @Get()
    getuser(){
        return this.usersService.getUser()
    }

    @Get(':id')
   async getUserById(@Param('id',ParseIntPipe) id:number){
      
        const user=await this.usersService.getUserById(id)
        if(!user) throw new HttpException('user Not Found',404 )
        console.log(user)
        return user

    }
    
    @Patch(':id')
    updateUserById(@Param('id',ParseIntPipe) id:number, @Body() updateuserDto:UpdateUserDto){
       return  this.usersService.updateUserById(id,updateuserDto)
    }

    @Delete(':id')
    deleteUserById(@Param('id',ParseIntPipe)id:number){
        return this.usersService.deleteUserById(id) 
    }
}