import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/user.dto';
import { CloudinaryService } from './cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getAllUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usersService.getAllUsers(Number(page), Number(limit));
  }
  @Get('search/email')
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.addUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.usersService.updateUser(id, updateUserDTO);
  }

  // @Delete(':id')
  // deleteUser(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.deleteUser(id);
  // }
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  getUserImages(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000,
            message: 'El archivo debe pesar hasta 20mb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('ARCHIVO RECIBIDO:', file);

    return this.cloudinaryService.uploadImage(file);
  }
}
