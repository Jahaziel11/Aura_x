import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";



export default {
  setup() {
   

    const ip = import.meta.env.VITE_API_URL;
    const columnas = ref([]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const productos = ref([]);
    const sessionStore = useSessionStore()
    const visible = ref(false);
    const position = ref('top');
    const tipos = ref('');
    const areas = ref('');
    const responsables = ref('');
    const v_nombre= ref('');
    const v_tipo= ref('');
    const v_area= ref('');
    const v_id= ref('');
    const v_responsable= ref('');
    const confirm = useConfirm();
    const toast = useToast();
    const bot_crear = ref(false);
    const bot_actua = ref(false);

    const paginatorConfig = {
      paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
      rowsPerPageOptions: [5, 10, 20],
      currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} registros',
      firstPageLabel: 'Primera página',
      prevPageLabel: 'Página anterior',
      nextPageLabel: 'Página siguiente',
      lastPageLabel: 'Última página',
      rowsPerPageLabel: 'Filas por página:'
    };


    onMounted(async () => {
      await cargar_macroprocesos();

      tipos.value = sessionStore.lista.tipos_macros.map(tipo => ({
        name: tipo.Nombre,
        code: tipo.id
      }));


      areas.value = sessionStore.lista.areas.map(area => ({
        name: area.Nombre,
        code: area.id
      }));

      responsables.value = sessionStore.lista.personal.map(perso => ({
        name: perso.primer_apellido+' '+perso.primer_nombre,
        code: perso.id
      }));
    });

    const cargar_macroprocesos = async () => {
      try {
        const response = await axios.get(ip + '/macroprocesos', {
          params: {
            sesion_id: sessionStore.sesion_id,
            acc: 1
          }
        });

        const data = response.data?.data;

        if (Array.isArray(data) && data.length > 0) {
          columnas.value = Object.keys(data[0]).map((key) => {
            const campo = key.toLowerCase(); 
            filters.value[campo] = { value: null, matchMode: FilterMatchMode.CONTAINS };
            return { field: campo, header: key };
          });
          productos.value = data;
        }

      } catch (error) {
        console.error('Error al cargar macroprocesos:', error);
      }
    };

    const limpiarFiltros = () => {
      Object.keys(filters.value).forEach(key => {
        filters.value[key].value = null;
      });
    };

    const muestramodal = () => {
      bot_crear.value = true;
      bot_actua.value = false;
      visible.value = true;
    }

    const crearmacroproceso = async () => {
      confirm.require({
        message: '¿Está de acuerdo en Crear el Macro Proceso?',
        header: 'Confirmacion del Usuario',
        icon: 'pi pi-exclamation-triangle',
        position: 'top',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Crear'
        },
        accept: async () => {
          const datos = {
            id:"0",
            nombre:v_nombre.value,
            tipo: v_tipo.value,
            area_responsable:v_area.value,
            responsable:v_responsable.value,
            estado:"P"
          }
          console.log(datos);
          const res = await axios.post(ip + '/macroprocesos', {
            sesion_id: sessionStore.sesion_id,
            data: datos
          });
          if (res.data.success) {
            visible.value = false;
            v_nombre.value = '';
            v_tipo.value = '';
            v_area.value = '';
            v_responsable.value = '';
            toast.add({ severity: 'success', summary: 'Exito', detail:res.data.mensaje, life: 3000 });
          }
          },
        reject: () => {
            
        }
    });
    }


    const editarmacro = (data:any) => {

      if(data.estado != 'A'){

        bot_crear.value = false;
        bot_actua.value = true;

        v_nombre.value = data.nombre;
        v_id.value = data.id;

        const aux = sessionStore.lista.personal.find(perso => {
          const nombreCompleto = `${perso.primer_apellido} ${perso.primer_nombre}`;
          return nombreCompleto === data.responsable;
        });
        v_responsable.value = aux.id;


        const tip = sessionStore.lista.tipos_macros.find(tipo => {
          return tipo.Nombre === data.tipo;
        });
        v_tipo.value =  tip.id;
      

        const are = sessionStore.lista.areas.find(area => {
          return area.Nombre === data.area;
        });
        v_area.value =  are.id;

        visible.value = true;
      }else{
        toast.add({ severity: 'error', summary: 'Alerta', detail: 'No se pueden editar procesos ya aprobados', life: 3000 });
      }
      
    }


    const editarmacroproceso = async () => {
      confirm.require({
        message: '¿Está de acuerdo en Editar el Macro Proceso?',
        header: 'Confirmacion del Usuario',
        icon: 'pi pi-exclamation-triangle',
        position: 'top',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Actualizar'
        },
        accept: async () => {
          const datos = {
            id:v_id.value,
            nombre:v_nombre.value,
            tipo: v_tipo.value,
            area_responsable:v_area.value,
            responsable:v_responsable.value,
            estado:"P"
          }
          const res = await axios.put(ip + '/macroprocesos', {
            sesion_id: sessionStore.sesion_id,
            data: datos
          });
          console.log(res);
          if (res.data.success) {
            visible.value = false;
            v_nombre.value = '';
            v_tipo.value = '';
            v_area.value = '';
            v_responsable.value = '';
            toast.add({ severity: 'success', summary: 'Exito', detail:res.data.mensaje, life: 3000 });
          }else{
             toast.add({ severity: 'error', summary: 'Alerta', detail:res.data.mensaje, life: 3000 });
          }
          },
        reject: () => {
            
        }
    });
    }

    

    return { 
      productos, 
      filters, 
      paginatorConfig,
      columnas,
      visible,
      position,
      tipos,
      areas,
      responsables,
      limpiarFiltros,
      muestramodal,
      crearmacroproceso,
      editarmacro,
      editarmacroproceso,
      v_nombre,
      v_tipo,
      v_area,
      v_responsable,
      bot_crear,
      bot_actua,
    };
  }
}