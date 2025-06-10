
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobType } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Extendemos JobType para asegurarnos de que userName es obligatorio para JobProps
export interface JobProps {
  job: JobType;
}

// Función para obtener el estilo del badge según el estado
const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200';
    case 'completed':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 border-purple-200';
    case 'closed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 border-gray-200';
  }
};

// Función para obtener el texto del estado en español
const getStatusText = (status: string) => {
  switch (status) {
    case 'open':
      return 'Abierto';
    case 'in_progress':
      return 'En Progreso';
    case 'completed':
      return 'Completado';
    case 'closed':
      return 'Cerrado';
    default:
      return 'Desconocido';
  }
};

export const JobCard = ({ job }: JobProps) => {
  // Función para formatear la fecha
  const formatDate = (dateString: string | number | Date): string => {
    try {
      // Si dateString ya es un objeto Date, usarlo directamente
      const date = dateString instanceof Date ? dateString : new Date(dateString);
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return "Fecha desconocida";
      }
      
      return format(date, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Fecha desconocida";
    }
  };

  // Asegurarse de que el estado existe
  const currentStatus = job.status || 'open';

  return (
    <Card className="bg-background dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:border-wfc-purple dark:hover:border-wfc-purple-light transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={job.userPhoto} />
            <AvatarFallback className="bg-wfc-purple-medium text-white">
              {job.userName?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link to={`/users/${job.userId}`} className="text-sm font-medium dark:text-white hover:underline">
              {job.userName || 'Usuario'}
            </Link>
            <p className="text-muted-foreground text-xs">{job.category}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`${getStatusBadgeStyle(currentStatus)} rounded-full px-3 py-1 font-medium`}
        >
          {getStatusText(currentStatus)}
        </Badge>
      </CardHeader>
      <CardContent>
        <Link to={`/jobs/${job.id}`} className="block">
          <h3 className="text-lg font-semibold dark:text-white hover:text-wfc-purple dark:hover:text-wfc-purple-light hover:underline transition-colors">{job.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          {job.description.substring(0, 100)}...
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm dark:text-gray-400">Presupuesto: ${job.budget}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-xs">
              {job.createdAt ? formatDate(job.createdAt) : 'Fecha no disponible'}
            </span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="text-xs">{job.skills?.join(', ') || 'Sin habilidades especificadas'}</span>
          </div>
        </div>
        <Link to={`/jobs/${job.id}`}>
          <Button size="sm" className="bg-wfc-purple hover:bg-wfc-purple-medium text-white rounded-full">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
