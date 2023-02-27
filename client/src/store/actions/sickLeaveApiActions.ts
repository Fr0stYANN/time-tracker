import { createAction } from '@reduxjs/toolkit';
import { AddSickLeaveType, UpdateSickLeaveType } from '../../types/sickLeaveTypes';

export const getSickLeavesByUserIdApiRequest = createAction<number>('sickleave/get/api/request');
export const addSickLeaveApiRequest = createAction<AddSickLeaveType>('sickleave/add/api/request');
export const editSickLeaveApiRequest = createAction<UpdateSickLeaveType>('sickleave/edit/api/request');
export const deleteSickLeaveApiRequest = createAction<number>('sickleave/delete/api/request');