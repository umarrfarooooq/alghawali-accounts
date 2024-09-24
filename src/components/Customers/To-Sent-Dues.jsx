import React from 'react';
import {
  usePendingDuesToSend,
  useMyPendingDuesToSend,
} from '@/hooks/useCustomers';
import { VerifyStaffToken } from '@/lib/VerifyStaffToken';
import roles from '@/lib/roles';
import CustomLoading from '../ui/CustomLoading';
import CustomerTable from './Customer-Table';

const ToSentDues = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allPendingDuesToSend, isLoading: loadingAllDues } = usePendingDuesToSend({
    enabled: accessCheck,
  });

  const { data: myPendingDuesToSend, isLoading: loadingMyDues } = useMyPendingDuesToSend(staffAccountId, {
    enabled: !accessCheck && !!staffAccountId,
  });

  if (loadingAllDues || loadingMyDues) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const dues = accessCheck ? allPendingDuesToSend : myPendingDuesToSend;

  return (
    <div className="flex flex-col gap-6">
      {dues && dues.length > 0 ? (
        dues.map((customer) => (
          <CustomerTable key={customer._id} customer={customer} />
        ))
      ) : (
        <div>No sent dues found.</div>
      )}
    </div>
  );
};

export default ToSentDues;
