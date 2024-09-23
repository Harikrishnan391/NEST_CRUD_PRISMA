import { HttpException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private prisma:PrismaService){}

    createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
          data: {
            ...data,
            userSetting: {
              create: {
                smsEnabled: true,
                notificationOn: false,
              },
            },
          },
        });
      }

    getUser(){
         return this.prisma.user.findMany()
    }

    getUserById(id:number){
        return this.prisma.user.findUnique({where:{id}})
    }

    async deleteUserById(id:number){
        const findUser=await this.getUserById(id)
        if(!findUser) throw new HttpException('User not found', 404)
            return  this.prisma.user.delete({where:{id}});
        
    }

   async updateUserById(id:number,data:Prisma.UserUpdateInput){
        const findUser= await this.getUserById(id)
        if(!findUser) throw new HttpException('user not found ',404)
        
          if(data.username){
            const findUser=await this.prisma.user.findUnique({
                where:{username:data.username as string}
            })

            if(findUser) throw new HttpException('Username already taken',400)
          }
          return this.prisma.user.update({where:{id},data})
    }
}