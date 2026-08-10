import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/user.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Numero de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Numero de página',
  })
  @Get()
  @Roles(Role.Admin, Role.Tester)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): any {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const ValidLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.usersService.getAllUsers(validPage, ValidLimit);
  }

  @ApiBearerAuth()
  @Get('search/email')
  @UseGuards(AuthGuard)
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id/admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  makeUserAdmin(@Param('id') id: string) {
    return this.usersService.makeUserAdmin(id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.deleteUserById(id);
  }
}
