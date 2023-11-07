<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request; 
use \PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Models\permisos;
use App\Models\HorasExtra;
use App\Models\Bono;

class ExcelController extends Controller
{
    public function get_documentPermiss($Fecha_inicio,$Fecha_corte)
    {

        date_default_timezone_set("America/Bogota");
        set_time_limit(600);
        
        $inputFileName = base_path().'/public/assets/docs/PERMISOS.xlsx';
        
        // $inputFileName ='/home/gematech/reports.gematech.co/assets/docs/PERMISOS.xlsx';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet = $spreadsheet->getActiveSheet();


        $cantidad_permisos = count(permisos::where([ ['fecha_inicio','>=',$Fecha_inicio],['fecha_inicio','<=',$Fecha_corte] ])->get());
        $position = 4 ;
        if($cantidad_permisos > 1){
            for($i = 0; $i < $cantidad_permisos; $i++){
                $permisos = permisos::with('responsable')-> where([ ['fecha_inicio','>=',$Fecha_inicio],['fecha_inicio','<=',$Fecha_corte] ])->get();
                $spreadsheet->getActiveSheet()->insertNewRowBefore($position, 1);
                $sheet->setCellValue('A'.$position, $permisos[$i]['responsable']['cc']);
                $sheet->setCellValue('B'.$position, $permisos[$i]['responsable']['nombre']);
                if($permisos[$i]['motivo'] == 'CALAMIDAD'){
                    $sheet->setCellValue( 'C'.$position, 'X' );
                }
                if($permisos[$i]['motivo'] == 'LICENCIA'){
                    $sheet->setCellValue( 'D'.$position, 'X' );
                }
                if($permisos[$i]['motivo'] == 'CITA MEDICA'){
                    $sheet->setCellValue( 'E'.$position, 'X' );
                }
                if($permisos[$i]['motivo'] == 'PERSONAL'){
                    $sheet->setCellValue( 'F'.$position, 'X' );
                }
                if($permisos[$i]['motivo'] == 'VACACIONES'){
                    $sheet->setCellValue( 'G'.$position, 'X' );
                }
                if($permisos[$i]['motivo'] == 'OTRO'){
                    $sheet->setCellValue( 'H'.$position, 'X' );
                }
                $sheet->setCellValue('I'.$position, $permisos[$i]['fecha_inicio']);
                $sheet->setCellValue('J'.$position, $permisos[$i]['fecha_terminacion']);
                if($permisos[$i]['jornada'] == 'MAÑANA'){
                    $sheet->setCellValue( 'K'.$position, 'X' );
                }
                if($permisos[$i]['jornada'] == 'TARDE'){
                    $sheet->setCellValue( 'L'.$position, 'X' );
                }
                if($permisos[$i]['jornada'] == 'COMPLETA'){
                    $sheet->setCellValue( 'M'.$position, 'X' );
                }
                $sheet->setCellValue('N'.$position, $permisos[$i]['hora_inicio']);
                $sheet->setCellValue('O'.$position, $permisos[$i]['hora_fin']);
                $sheet->setCellValue('P'.$position, $permisos[$i]['cant_horas']);
                $sheet->setCellValue('Q'.$position, $permisos[$i]['observaciones']);

                $spreadsheet->getActiveSheet()->getStyle('A'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('B'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('C'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('D'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('E'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('F'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('G'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('H'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('I'.$position)->getFill()->getStartColor()->setARGB('d9e1f2');
                $spreadsheet->getActiveSheet()->getStyle('J'.$position)->getFill()->getStartColor()->setARGB('d9e1f2');
                $spreadsheet->getActiveSheet()->getStyle('K'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('L'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('M'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('N'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('O'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('P'.$position)->getFill()->getStartColor()->setARGB('ffffcc');
                $spreadsheet->getActiveSheet()->getStyle('Q'.$position)->getFill()->getStartColor()->setARGB('d9e1f2');
                $position = $position+1;
            }

        }

        $writer = new Xlsx($spreadsheet);

        $Today = date("Y-m-d");

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=Reporte_Permisos_{$Today}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output');

    }

    public function get_documenthoras($Fecha_inicio,$Fecha_corte)
    {

        date_default_timezone_set("America/Bogota");
        set_time_limit(600);

        
        $inputFileName = base_path().'/public/assets/docs/Horas.xlsx';

        // $inputFileName = '/home/gematech/reports.gematech.co/assets/docs/Horas.xlsx';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $sheet = $spreadsheet->getActiveSheet();


        $cantidad_horas = count(HorasExtra::where([['estado','LIKE','Autorizado'],['fecha','>=',$Fecha_inicio],['fecha','<=',$Fecha_corte]])->get());
        $position = 9 ;
        if($cantidad_horas >= 1){
            for($i = 0; $i < $cantidad_horas; $i++){
                $horas = HorasExtra::with('responsable')-> where([['estado','LIKE','Autorizado'],['fecha','>=',$Fecha_inicio],['fecha','<=',$Fecha_corte]])->get();
                $spreadsheet->getActiveSheet()->insertNewRowBefore($position, 1);
                $sheet->setCellValue('C'.$position, $horas[$i]['fecha']);
                $sheet->setCellValue('D'.$position, $horas[$i]['responsable']['nombre']);
                $sheet->setCellValue('E'.$position, $horas[$i]['ot']);
                $sheet->setCellValue('F'.$position, $horas[$i]['hora_inicial']);
                $sheet->setCellValue('G'.$position, $horas[$i]['hora_final']);
                $sheet->setCellValue('H'.$position, 'Director de Mantenimiento');
                $sheet->setCellValue('I'.$position, $horas[$i]['cant_Horas']);
                $spreadsheet->getActiveSheet()->getStyle('C'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('D'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('E'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('F'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('G'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('H'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('I'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                $spreadsheet->getActiveSheet()->getStyle('C'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('D'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('E'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('F'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('G'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('H'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                $spreadsheet->getActiveSheet()->getStyle('I'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                
    
                $position = $position+1;
            }

        }

        $writer = new Xlsx($spreadsheet);

        $Today = date("Y-m-d");

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header("Content-Disposition: attachment;filename=Reporte_Horas_{$Today}.xlsx");
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer -> save('php://output');

    }

    public function get_documentBonos($Fecha_inicio,$Fecha_corte)
    {
        try {
            date_default_timezone_set("America/Bogota");
            set_time_limit(600);

            
            $inputFileName = base_path().'/public/assets/docs/Bonos.xlsx';

            // $inputFileName = '/home/gematech/reports.gematech.co/assets/docs/Bonos.xlsx';

            /** Load $inputFileName to a Spreadsheet object **/
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
            
            $sheet = $spreadsheet->getActiveSheet();

            $cantidad_bono = count(Bono::where([
                ['estado','LIKE','Autorizado']
            ,
                ['fecha_bono','>=',$Fecha_inicio]
            ,
                ['fecha_bono','<=',$Fecha_corte]
            ])->get());
            
            
            $position = 9 ;
            if($cantidad_bono >= 1){
                for($i = 0; $i < $cantidad_bono; $i++){
                    $bonos = Bono::with('responsable')->where([['estado','LIKE','Autorizado'],['fecha_bono','>=',$Fecha_inicio],['fecha_bono','<=',$Fecha_corte]])->get();
                    $spreadsheet->getActiveSheet()->insertNewRowBefore($position, 1);
                    $sheet->setCellValue('C'.$position, $bonos[$i]['fecha_bono']);
                    $sheet->setCellValue('D'.$position, $bonos[$i]['responsable']['nombre']);
                    $sheet->setCellValue('E'.$position, $bonos[$i]['ot_id']);
                    $sheet->setCellValue('F'.$position, $bonos[$i]['lugar_bono']);
                    $sheet->setCellValue('G'.$position, $bonos[$i]['cliente']);
                    $sheet->setCellValue('H'.$position, 'Director de Mantenimiento');
                    $spreadsheet->getActiveSheet()->getStyle('C'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('D'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('E'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('F'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('G'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('H'.$position)->getFill()->getStartColor()->setARGB('FFFFFF');
                    $spreadsheet->getActiveSheet()->getStyle('C'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                    $spreadsheet->getActiveSheet()->getStyle('D'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                    $spreadsheet->getActiveSheet()->getStyle('E'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                    $spreadsheet->getActiveSheet()->getStyle('F'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                    $spreadsheet->getActiveSheet()->getStyle('G'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                    $spreadsheet->getActiveSheet()->getStyle('H'.$position)->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_BLACK);
                
                    $position = $position+1;
                }

            }
            
            $writer = new Xlsx($spreadsheet);
            $Today = date("Y-m-d");
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header("Content-Disposition: attachment;filename=Reporte_Bonos_{$Today}.xlsx");
            header('Cache-Control: max-age=0');
            $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx'); 
            $writer -> save('php://output'); 
            
        } catch (\Throwable $th) {
            dd($th);
        }
    }
}
