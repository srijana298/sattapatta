import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ComponentCard from '../components/common/ComponentCard';
import { useMutation, useQuery } from 'react-query';
import { createSkill, getAllSkills } from '../services/skills';
import Button from '../components/ui/button/Button';
import { Modal } from '../components/ui/modal';
import { useState } from 'react';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import { Skill } from '../lib/skills';
import { useSkills } from '../hooks/useSkills';

export default function Skills() {
  const { data, isLoading, refetch } = useSkills();

  const [name, setName] = useState('');

  const handleSave = async () => {
    await mutateAsync({ name });
  };

  const { mutateAsync } = useMutation({
    mutationFn: (skill: Skill) => createSkill(skill),
    mutationKey: 'createSkill',
    onSuccess: () => {
      setName('');
      closeModal();
      refetch();
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PageBreadcrumb pageTitle="Skills" />

      <div className="space-y-6">
        <ComponentCard title="Skills">
          <div className="w-full flex justify-end">
            <Button className="justify-end" onClick={() => setIsOpen(true)}>
              Add Skill
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      S.N
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {(data || [])?.map((order, index) => (
                    <TableRow key={order.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">{index + 1}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Add Skill Information
              </h4>
              {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update your details to keep your profile up-to-date.
              </p> */}
            </div>
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div>
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Programming"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
