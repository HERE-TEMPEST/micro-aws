import { Request, Response } from 'express';

export class GroupsViewController {
  async allGroups(request: Request, response: Response) {
    return [];
  }

  async getGroupById(request: Request, response: Response) {
    return {};
  }
}

export const viewGroupController = new GroupsViewController();
